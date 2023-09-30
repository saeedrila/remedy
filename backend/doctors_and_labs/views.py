# From libraries
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
import datetime

# From files
from .import views
from .models import Account
from .serializers import (
    RegisterSpecialization,
    DoctorAvailabilityRegistration,
    DoctorAvailabilitySerializer,
)
from .models import (
    DoctorProfile, 
    LabProfile, 
    DoctorSpecializationsAvailable, 
    DoctorSpecializations,
    DoctorAvailability,
)


# Register Specialization
@csrf_exempt
@api_view(['POST'])
def register_specialization(request):
    serializer = RegisterSpecialization(data=request.data)
    if serializer.is_valid():
        specialization_title = serializer.validated_data.get('specialization')

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


# Request from frontend
# Doctor specialization
@csrf_exempt
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


# Doctor time slots available
@api_view(['GET'])
def doctors_at_specialization(request, specialtyId=None):
    if specialtyId is None:
        specialization_id = request.query_params.get('specialtyId')
    else:
        specialization_id = specialtyId
    if specialization_id is not None:
        doctor_data = DoctorSpecializations.objects.filter(doctor__doctorspecializations__specialization_id=specialization_id)
        doctor_ids = list(doctor_data.values_list('doctor_id', flat=True))
        sending_data = {}
        fee_per_session_list = []
        for id in doctor_ids:
            try:
                fee_per_session_data = DoctorProfile.objects.filter(doctor = id)
                fee_per_session_float = float(fee_per_session_data.values_list('fee_per_session', flat=True).first())
                fee_per_session_list.append(fee_per_session_float)
            except:
                fee_per_session_list.append([])
        print('Fee per session list: ',fee_per_session_list)

        doctor_availability_list = []
        timing_availability_list = []
        for id in doctor_ids:
            try:
                doctor_availability_data = DoctorAvailability.objects.filter(doctor = id)
                doctor_availability_ids = list(doctor_availability_data.values_list('id', flat=True))
                doctor_slots = list(doctor_availability_data.values_list('slots_status', flat=True))
                doctor_availability_list.append(doctor_availability_ids)
                timing_availability_list.append(doctor_slots)
            except:
                pass

        print('Doctor availability list: ', doctor_availability_list)
        print('Timing availabilty list: ', timing_availability_list)

        print('Sending_data: ', sending_data)

        print('Doctor_ids: ', doctor_ids)
        doctor_availabilities = DoctorAvailability.objects.filter(doctor__doctorspecializations__specialization_id=specialization_id)
        

        # for availability in doctor_availabilities:
        #     doctor_id = availability.doctor.id
        #     availability_id = availability.id
        #     try:
        #         doctor_profile = DoctorProfile.objects.get(doctor=doctor_id)
        #         fee_per_session = doctor_profile.fee_per_session
        #     except DoctorProfile.DoesNotExist:
        #         fee_per_session = None
            
            # doctor_info = {
            #     'doctor_id': doctor_id,
            #     'doctor_fee': fee_per_session,
            #     'availability_ids': [availability_id],
            # }
            # existing_info = next((info for info in sending_data if info['doctor_id'] == doctor_id), None)
            # if existing_info:
            #     existing_info['availability_ids'].append(availability_id)
            # else:
            #     sending_data.append(doctor_info)

            # print(f"Availability ID: {availability.id}")
            # print(f"Doctor ID: {availability.doctor.id}")
            # print('Doctor Data serialized?:', sending_data)
        return Response(status=200)
    else:
        return Response({'error': 'Missing or invalid "specialtyId" parameter'}, status=400)

# Doctor's available timing registration
@api_view(['POST'])
def doctor_availability_registration(request):
    serializer = DoctorAvailabilityRegistration(data=request.data)
    if serializer.is_valid():
        date = serializer.validated_data.get('date')
        if request.user.is_doctor:
            start_time = datetime.time(6, 0)
            end_time = datetime.time(22, 00)
            slots_data = {
                "online": [],
                "inPerson": []
            }
            time_interval = datetime.timedelta(minutes=15)
            current_time = datetime.datetime.combine(datetime.date.today(), start_time)
            slot_id = 1

            while current_time.time() < end_time:
                time_str = current_time.strftime("%I:%M %p")
                time_slot = {
                    "id": slot_id,
                    "time": time_str,
                    "status": "N"
                }
                slots_data["online"].append(time_slot.copy())
                slots_data["inPerson"].append(time_slot)
                current_time += time_interval
                slot_id += 1
        
            doctor = request.user
            specialization, created = DoctorAvailability.objects.get_or_create(doctor=doctor, date=date)

            if created:
                specialization.slots_status = slots_data
                specialization.save()
            return Response({"slots_data": slots_data})
        else:
            return Response({"details": "You are not authorized to submit availability"})
    else:
        return Response(serializer.errors, status=400)
