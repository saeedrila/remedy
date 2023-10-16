# From libraries
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import ListAPIView
from django.db.models import F, ExpressionWrapper, FloatField
from datetime import datetime, timedelta, time, date

# From files
from .import views
from .models import Account
from .serializers import (
    RegisterSpecialization,
)
from .models import (
    DoctorProfile, 
    LabProfile,
    DoctorSpecializations,
    DoctorAvailability,
)


# Register Specialization
class RegisterSpecialization(APIView):
    @csrf_exempt
    def post(self, request):
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
                    return Response({"details": "Specialization successfully added to your profile"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"details": "You already have this specialization"}, status=status.HTTP_200_OK)

            elif request.user.is_executive:
                specialization_available, created = DoctorSpecializationsAvailable.objects.get_or_create(specialization_title=specialization_title)
                if created:
                    return Response({"details": "Specialization successfully created"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"details": "Specialization already exists"}, status=status.HTTP_200_OK)
            else:
                return Response({"details": "You are not authorized to add specialization"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Request from frontend
# Doctor specialization
class DoctorSpecializationData(APIView):
    @csrf_exempt
    def get(self, request):
        specialization_data = DoctorSpecializationsAvailable.objects.all()
        if not specialization_data:
            return Response({"details": "No specialization data available"}, status=status.HTTP_412_PRECONDITION_FAILED)
        serialized_data = [
            {
                'id': item.id,
                'title': item.specialization_title
            }
            for item in specialization_data
        ]
        return Response(serialized_data)

# Doctor name and fee
class DoctorSpecializationDetail(APIView):
    @csrf_exempt
    def get(self, request, specialtyId):
        specialization = DoctorSpecializationsAvailable.objects.get(pk=specialtyId)
        queryset1 = DoctorSpecializations.objects.filter(specialization=specialization)
        print(queryset1)

        # queryset = DoctorSpecializations.objects.filter(specialization__id=specialization_id)
        
        # queryset = queryset.annotate(
        #     fee_per_session=ExpressionWrapper(
        #         F('doctor__doctor_profiles__fee_per_session'),
        #         output_field=FloatField()
        #     )
        # )
        # print(queryset)

        serializer = self.serializer_class(queryset1, many=True)
        return Response(serializer.data, status=200)

# Doctor time slots available
class DoctorsAtSpecialization(APIView):
    @csrf_exempt
    def get(self, request, specialtyId=None):
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
                    fee_per_session_data = DoctorProfile.objects.filter(doctor=id)
                    fee_per_session_float = float(fee_per_session_data.values_list('fee_per_session', flat=True).first())
                    fee_per_session_list.append(fee_per_session_float)
                except:
                    fee_per_session_list.append([])

            print('Fee per session list: ', fee_per_session_list)

            doctor_availability_list = []
            timing_availability_list = []
            for id in doctor_ids:
                try:
                    doctor_availability_data = DoctorAvailability.objects.filter(doctor=id)
                    doctor_availability_ids = list(doctor_availability_data.values_list('id', flat=True))
                    doctor_slots = list(doctor_availability_data.values_list('slots_status', flat=True))
                    doctor_availability_list.append(doctor_availability_ids)
                    timing_availability_list.append(doctor_slots)
                except:
                    pass

            print('Doctor availability list: ', doctor_availability_list)
            print('Sending_data: ', sending_data)
            print('Doctor_ids: ', doctor_ids)

            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Missing or invalid "specialtyId" parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
# @api_view(['GET'])
# def doctors_at_specialization(request, specialtyId=None):
#     if specialtyId is None:
#         specialization_id = request.query_params.get('specialtyId')
#     else:
#         specialization_id = specialtyId
#     if specialization_id is not None:
#         doctor_data = DoctorSpecializations.objects.filter(doctor__doctorspecializations__specialization_id=specialization_id)
#         doctor_ids = list(doctor_data.values_list('doctor_id', flat=True))
#         sending_data = {}
#         fee_per_session_list = []
#         for id in doctor_ids:
#             try:
#                 fee_per_session_data = DoctorProfile.objects.filter(doctor = id)
#                 fee_per_session_float = float(fee_per_session_data.values_list('fee_per_session', flat=True).first())
#                 fee_per_session_list.append(fee_per_session_float)
#             except:
#                 fee_per_session_list.append([])
#         print('Fee per session list: ',fee_per_session_list)

#         doctor_availability_list = []
#         timing_availability_list = []
#         for id in doctor_ids:
#             try:
#                 doctor_availability_data = DoctorAvailability.objects.filter(doctor = id)
#                 doctor_availability_ids = list(doctor_availability_data.values_list('id', flat=True))
#                 doctor_slots = list(doctor_availability_data.values_list('slots_status', flat=True))
#                 doctor_availability_list.append(doctor_availability_ids)
#                 timing_availability_list.append(doctor_slots)
#             except:
#                 pass

#         print('Doctor availability list: ', doctor_availability_list)
#         print('Timing availabilty list: ', timing_availability_list)

#         print('Sending_data: ', sending_data)

#         print('Doctor_ids: ', doctor_ids)
#         doctor_availabilities = DoctorAvailability.objects.filter(doctor__doctorspecializations__specialization_id=specialization_id)
        

#         # for availability in doctor_availabilities:
#         #     doctor_id = availability.doctor.id
#         #     availability_id = availability.id
#         #     try:
#         #         doctor_profile = DoctorProfile.objects.get(doctor=doctor_id)
#         #         fee_per_session = doctor_profile.fee_per_session
#         #     except DoctorProfile.DoesNotExist:
#         #         fee_per_session = None
            
#             # doctor_info = {
#             #     'doctor_id': doctor_id,
#             #     'doctor_fee': fee_per_session,
#             #     'availability_ids': [availability_id],
#             # }
#             # existing_info = next((info for info in sending_data if info['doctor_id'] == doctor_id), None)
#             # if existing_info:
#             #     existing_info['availability_ids'].append(availability_id)
#             # else:
#             #     sending_data.append(doctor_info)

#             # print(f"Availability ID: {availability.id}")
#             # print(f"Doctor ID: {availability.doctor.id}")
#             # print('Doctor Data serialized?:', sending_data)
#         return Response(status=200)
#     else:
#         return Response({'error': 'Missing or invalid "specialtyId" parameter'}, status=400)

# Doctor's available timing registration
class DoctorAvailabilityRegistration(APIView):
    def get(self, request):
        #For doctors:
        if request.user.is_doctor:
            try:
                account = Account.objects.get(id = request.user.id)
                # Dates from datetime library
                day_zero_raw = datetime.now().date()
                day_one_raw = day_zero_raw + timedelta(days=1)
                day_two_raw = day_zero_raw + timedelta(days=2)
                day_three_raw = day_zero_raw + timedelta(days=3)
                # Dates converted into YYYY-MM-DD format
                day_zero = day_zero_raw.strftime("%Y-%m-%d")
                day_one = day_one_raw.strftime("%Y-%m-%d")
                day_two = day_two_raw.strftime("%Y-%m-%d")
                day_three = day_three_raw.strftime("%Y-%m-%d")
                # Slots dummy empty data
                start_time = time(8, 0)
                end_time = time(10, 0)
                slots_dummy_data = {}
                time_interval = timedelta(minutes=15)
                current_time = datetime.combine(date.today(), start_time)
                slot_id = 1

                while current_time.time() < end_time:
                    time_str = current_time.strftime("%I:%M %p")
                    time_slot = {
                        "time": time_str,
                        "status": "notAvailable"
                    }
                    slots_dummy_data[slot_id] = time_slot
                    current_time += time_interval
                    slot_id += 1

                # Getting status from db
                status_day_zero, created = DoctorAvailability.objects.get_or_create(
                    date=day_zero,
                    doctor=account,
                    defaults={
                        'slots_details_online': slots_dummy_data,
                        'slots_details_offline': slots_dummy_data
                    }
                )
                status_day_one, _ = DoctorAvailability.objects.get_or_create(
                    date=day_one,
                    doctor=account,
                    defaults={
                        'slots_details_online': slots_dummy_data,
                        'slots_details_offline': slots_dummy_data
                    }                
                )
                status_day_two, _ = DoctorAvailability.objects.get_or_create(
                    date=day_two,
                    doctor=account,
                    defaults={
                        'slots_details_online': slots_dummy_data,
                        'slots_details_offline': slots_dummy_data
                    }                
                )
                status_day_three, _ = DoctorAvailability.objects.get_or_create(
                    date=day_three,
                    doctor=account,
                    defaults={
                        'slots_details_online': slots_dummy_data,
                        'slots_details_offline': slots_dummy_data
                    }                
                )
                # Create status dict to send to frontend
                doctor_availabilities = [status_day_zero, status_day_one, status_day_two, status_day_three]
                # serializer = DoctorAvailabilitySerializer(doctor_availabilities, many=True)
                serialized_data = []
                for doctor_availability in doctor_availabilities:
                    serialized_data.append({
                        'id': doctor_availability.id,
                        'date': doctor_availability.date,
                        'slots_status_online': doctor_availability.slots_status_online,
                        'slots_status_offline': doctor_availability.slots_status_offline,
                        'slots_details_online': doctor_availability.slots_details_online,
                        'slots_details_offline': doctor_availability.slots_details_offline,
                    })
                return Response(serialized_data, status=status.HTTP_200_OK)

            except Account.DoesNotExist:
                return Response({"detail": "User with this ID does not exist."}, status=status.HTTP_401_UNAUTHORIZED)
        elif request.user.is_patient:
            pass
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)
        
    # def post(self, request):
    #     serializer = DoctorAvailabilityRegistration(data=request.data)
    #     if serializer.is_valid():
    #         date = serializer.validated_data.get('date')
    #         if request.user.is_doctor:
    #             start_time = datetime.time(6, 0)
    #             end_time = datetime.time(22, 0)
    #             slots_data = {
    #                 "online": [],
    #                 "inPerson": []
    #             }
    #             time_interval = datetime.timedelta(minutes=15)
    #             current_time = datetime.datetime.combine(datetime.date.today(), start_time)
    #             slot_id = 1

    #             while current_time.time() < end_time:
    #                 time_str = current_time.strftime("%I:%M %p")
    #                 time_slot = {
    #                     "id": slot_id,
    #                     "time": time_str,
    #                     "status": "N"
    #                 }
    #                 slots_data["online"].append(time_slot.copy())
    #                 slots_data["inPerson"].append(time_slot)
    #                 current_time += time_interval
    #                 slot_id += 1

    #             doctor = request.user
    #             specialization, created = DoctorAvailability.objects.get_or_create(doctor=doctor, date=date)

    #             if created:
    #                 specialization.slots_status = slots_data
    #                 specialization.save()
    #             return Response({"slots_data": slots_data})
    #         else:
    #             return Response({"details": "You are not authorized to submit availability"}, status=status.HTTP_401_UNAUTHORIZED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
