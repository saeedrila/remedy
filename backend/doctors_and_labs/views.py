# From libraries
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import ListAPIView
from django.db.models import F, ExpressionWrapper, FloatField
from datetime import datetime, timedelta, time, date
import json

# From files
from .import views
from .models import Account
from .serializers import (
    RegisterSpecialization,
    DoctorAvailabilityToggleSerializer,
    DoctorProfileSerializer,
    SpecializationSerializer,
    AccountSerializerDoctorAtSpecialization,
)
from .models import (
    DoctorProfile, 
    LabProfile,
    DoctorSpecializations,
    DoctorAvailability,
)



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
        
    def patch(self, request):
        if request.user.is_doctor:
            serializer = DoctorAvailabilityToggleSerializer(data= request.data)
            if serializer.is_valid():
                slot_status = serializer.validated_data.get('status')
                date = serializer.validated_data.get('date')
                line = serializer.validated_data.get('line')
                slot_id = serializer.validated_data.get('slot_id')
                slot_status_script = 'available' if slot_status else 'notAvailable'
                # print('Date: ', date, 'Line: ', line, 'Slot_id: ', slot_id, 'Status: ', slot_status_script)

                # column_name = 'slots_status_offline' if line == 'offline' else 'slots_status_online'
                
                time_slot_object = DoctorAvailability.objects.get(doctor=request.user, date=date)
                # print('Time slot obj: ', time_slot_object)

                # Assuming the model has attributes or fields named 'slots_status_offline' and 'slots_status_online'
                if line == 'offline':
                    column_data = time_slot_object.slots_details_offline
                else:
                    column_data = time_slot_object.slots_details_online
                # print('Column name: ', column_name)
                # print('Column data: ', column_data)
                if isinstance(column_data, dict):
                    if slot_id in column_data:
                        updated_column_data = dict(column_data)

                        # Update 'time' and 'status' for the selected slot within the dictionary
                        updated_column_data[slot_id]['status'] = slot_status_script
                        
                        # Convert the dictionary to a JSON string
                        column_data_json = updated_column_data
                        
                        # Set the JSON data back to the model field
                        if line == 'offline':
                            time_slot_object.slots_details_offline = column_data_json
                        else:
                            time_slot_object.slots_details_online = column_data_json
                        
                        # Save the changes to the model
                        time_slot_object.save()
                        
                        # print('Column data updated: ', updated_column_data)
                        return Response({"details": "Successfully updated"}, status=status.HTTP_200_OK)
                    else:
                        print('Slot ID not found in column_data')
                else:
                    print('column_data is not a dictionary')

                return Response({"details": "Successfully updated"}, status=status.HTTP_200_OK)

            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"details": "Not authorized."}, status=status.HTTP_401_UNAUTHORIZED)


# Doctor Account Details:
class DoctorAccountDetails(APIView):
    def get(self, request):
        if request.user:
            try:
                account_details, created = DoctorProfile.objects.get_or_create(doctor=request.user)
                serializer = DoctorProfileSerializer(account_details)
                return Response(serializer.data, status=status.HTTP_200_OK)
            
            except DoctorProfile.MultipleObjectsReturned:
                return Response({"error": "Multiple profiles found for this user."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "User is not a doctor."}, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request):
        try:
            account_details = DoctorProfile.objects.get(doctor=request.user)
            serializer = DoctorProfileSerializer(account_details, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
# Get list of all specialization
class GetListOfSpecialization(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        try:
            specializations_available = DoctorSpecializations.objects.values('specialization_title').distinct()
            serializer = SpecializationSerializer(specializations_available, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": "Could not get specializations available", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        if request.user:
            try:
                new_title = request.data.get('new_title')
                specialization, created = DoctorSpecializations.objects.get_or_create(
                    specialization_title=new_title,
                    doctor=request.user
                )
                if not created:
                    return Response({"message": "Specialization already exists."}, status=status.HTTP_200_OK)
                
                serializer = SpecializationSerializer(specialization)

                return Response(serializer.data, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                return Response({"error": f"Could not create new entry: {str(e)}"}, status=status.HTTP_409_CONFLICT)
        else:
            return Response({"error": "User is not a doctor."}, status=status.HTTP_400_BAD_REQUEST)

# Doctor specific specialization list
class DoctorSpecificSpecialization(APIView):
    def get(self, request):
        try:
            specializations_available = DoctorSpecializations.objects.filter(doctor_id=request.user).values('specialization_title').distinct()
            serializer = SpecializationSerializer(specializations_available, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": "Could not get specializations available", "details": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
# Doctors list for a specialization
class DoctorsListAtSpecialization(APIView):
    def get(self, request):
        try:
            title = request.query_params.get('title', None)
            if title is not None:
                title = title.replace('-', ' ')
                list_of_doctors = DoctorSpecializations.objects.filter(specialization_title=title).values('doctor')
                serializer = AccountSerializerDoctorAtSpecialization(Account.objects.filter(id__in=list_of_doctors), many=True)
                print('List of doctors serializer: ',serializer)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)
        except DoctorSpecializations.DoesNotExist:
            return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)








# Have to check the below classes and have to delete those which are not required in production.
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
