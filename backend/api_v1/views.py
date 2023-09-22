from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from authentication.models import Account
from doctors_and_labs.models import (
    DoctorProfile, 
    LabProfile, 
    DoctorSpecializationsAvailable, 
    DoctorSpecializations
)
from executives.models import ExecutiveProfile
from patients.models import PatientProfile
from .serializers import (
    AccountSerializer,
    AllAccountSerializer,
    LoginSerializer,
    UserActivationSerializer,
    ProfileUpdate,
    RegisterSpecialization,
)
from rest_framework import status
from django.contrib.auth import authenticate, login, logout


# Generic show all user accounts should be deleted before deploying
@api_view(['GET'])
def get_data(request):
    account = Account.objects.all().order_by('-id')
    serializer = AllAccountSerializer(account, many=True)
    return Response(serializer.data)

# Sign up
# Generic user account creation
@api_view(['POST'])
def add_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(email = email, password = password)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Patient signup
@api_view(['POST'])
def patient_signup(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_patient = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_patient=is_patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Doctor signup
@api_view(['POST'])
def doctor_signup(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_doctor = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_doctor=is_doctor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Lab signup
@api_view(['POST'])
def lab_signup(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_lab = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_lab=is_lab)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Executive signup
@api_view(['POST'])
def executive_signup(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_executive = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_executive=is_executive)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login
# Patinet Login
@api_view(['POST'])
def patient_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_patient:
            login(request, user)
            return Response({'message': 'Patient login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a patient'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Executive Login
@api_view(['POST'])
def executive_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_executive:
            login(request, user)
            return Response({'message': 'Executive login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as an executive'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Doctor Login
@api_view(['POST'])
def doctor_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_doctor:
            login(request, user)
            return Response({'message': 'Doctor login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a doctor'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Lab Login
@api_view(['POST'])
def lab_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_ls:
            login(request, user)
            return Response({'message': 'Lab login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a lab'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    

# Activate users
@api_view(['PATCH'])
def activate_user(request):
    # Check whether this request is coming from an executive or not
    # if not request.user.is_exective: 
    #     return Response({"detail": "You are not authorized to do this operation"}, status=403)

    # Second if the status to be updated is a superuser: 400. Else: proceed
    serializer = UserActivationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.erros, status=400)
    
    user_id = serializer.validated_data['id']
    is_active = serializer.validated_data['is_active']
    
    try:
        account = Account.objects.get(id = user_id)
    except Account.DoesNotExist:
        return Response({"detail": "User with this ID does not exist."}, status=400)

    if account.is_superuser:
        return Response({"detail": "Cannot update a Superuser account"}, status=400)
     
    account.is_active = is_active
    account.save()

    return Response({"detail": "User account updated successfully"}, status=200)

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


# Register Specialization
@csrf_exempt
@api_view(['POST'])
def register_specialization(request):
    serializer = RegisterSpecialization(data=request.data)
    if serializer.is_valid():
        specialization_title = serializer.validated_data.get('specialization')
        print(request.user.is_executive)
        print(request.user.is_doctor)

        if request.user.is_doctor:
            doctor = request.user
            specialization, created = DoctorSpecializationsAvailable.objects.get_or_create(specialization_title=specialization_title)
            already_exist = DoctorSpecializations.objects.filter(doctor=doctor, specialization=specialization).exists()
            if not already_exist:
                doctor_specialization = DoctorSpecializations(doctor=doctor, specialization=specialization)
                doctor_specialization.save()
                return Response({"details": "Specialization successfully added to your profile"}, status=201)
            else:
                return Response({"details": "You already have this specialization"}, status=200)

        elif request.user.is_executive:
            specialization_available, created = DoctorSpecializationsAvailable.objects.get_or_create(specialization_title=specialization_title)
            if created:
                return Response({"details": "Specialization successfully created"}, status=201)
            else:
                return Response({"details": "Specialization already exist"}, status=200)
        else:
            return Response({"details": "You are not authorized to add specialization"}, status=400)
    else:
        return Response(serializer.errors, status=400)

# Doctor specialization for frontend
@api_view(['GET'])
def doctor_specialization_data(request):
    specialization_data = DoctorSpecializationsAvailable.objects.all()
    if not specialization_data:
        return Response({"details": "No specialization data available"}, status=412)
    serialized_data = [
        {
            'id': item.id,
            'title': item.specialization_title
        }
        for item in specialization_data
    ]
    return Response(serialized_data)