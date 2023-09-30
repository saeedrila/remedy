from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import Account
from doctors_and_labs.models import (
    DoctorProfile, 
    LabProfile,
)
from executives.models import ExecutiveProfile
from patients.models import PatientProfile
from .serializers import (
    ProfileUpdate,
)



#Profile updation
@api_view(['PATCH'])
def profile_update(request):
    serializer = ProfileUpdate(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.erros, status=400)
    
    user_id = request.user.id
    try:
        account = Account.objects.get(id=user_id)
    except Account.DoesNotExist:
        return Response({"details": "User account not found"})

    account.username = serializer.validated_data.get('username', account.username)
    account.mobile = serializer.validated_data.get('mobile', account.mobile)
    account.gender = serializer.validated_data.get('gender', account.gender)
    account.age = serializer.validated_data.get('age', account.age)
    account.blood_group = serializer.validated_data.get('blood_group', account.blood_group)
    account.profile_pic_url = serializer.validated_data.get('profile_pic_url', account.profile_pic_url)
    account.address = serializer.validated_data.get('address', account.address)
    account.save()

    # For Doctor
    if account.is_doctor:
        try:
            doctor_profile, created = DoctorProfile.objects.get_or_create(doctor=account)
        except DoctorProfile.DoesNotExist:
            return Response({"details": "Doctor Profile not found"}, status=404)
        
        doctor_profile.fee_per_session = serializer.validated_data.get('fee_per_session', doctor_profile.fee_per_session)
        doctor_profile.experience = serializer.validated_data.get('experience', doctor_profile.experience)
        doctor_profile.description = serializer.validated_data.get('description', doctor_profile.description)
        doctor_profile.document = serializer.validated_data.get('document', doctor_profile.document)
        doctor_profile.save()

    # For Executive
    if account.is_executive:
        try:
            executive_profile, created = ExecutiveProfile.objects.get_or_create(executive=account)
        except ExecutiveProfile.DoesNotExist:
            return Response({"details": "Patient Profile not found"}, status=404)
        
        executive_profile.description = serializer.validated_data.get('description', executive_profile.description)
        executive_profile.document = serializer.validated_data.get('document', executive_profile.document)
        executive_profile.save()

    # For Patient
    if account.is_patient:
        try:
            patient_profile, created = PatientProfile.objects.get_or_create(patient=account)
        except PatientProfile.DoesNotExist:
            return Response({"details": "Patient Profile not found"}, status=404)
        
        patient_profile.description = serializer.validated_data.get('description', patient_profile.description)
        patient_profile.document = serializer.validated_data.get('document', patient_profile.document)
        patient_profile.save()

    # For Lab
    if account.is_lab:
        try:
            lab_profile, created = LabProfile.objects.get_or_create(lab=account)
        except LabProfile.DoesNotExist:
            return Response({"details": "Lab Profile not found"}, status=404)
        
        lab_profile.experience = serializer.validated_data.get('experience', lab_profile.experience)
        lab_profile.description = serializer.validated_data.get('description', lab_profile.description)
        lab_profile.document = serializer.validated_data.get('document', lab_profile.document)
        lab_profile.save()

    return Response({"details": "Account successfully updated"}, status=200)

