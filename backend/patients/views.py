from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Account
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, date, timedelta


from authentication.serializers import AllAccountSerializer
from .serializers import PatientAccountSerializer
from doctors_and_labs.models import (
    DoctorSpecializations,
    DoctorAvailability,
)
from doctors_and_labs.serializers import (
    AccountSerializerDoctorAtSpecialization,
)
from .serializers import (
    PatchProfileDetailsSerializer,
)

class GetPatientProfileDetails(APIView):
    def get(self, request):
        try:
            email = request.user.email
            account = Account.objects.get(email = email)
            serializer = PatientAccountSerializer(account)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def patch(self, request):
        try:
            email = request.user.email
            account = Account.objects.get(email = email)
            serializer = PatientAccountSerializer(account, data = request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
class PatchProfileDetails(APIView):
    def clean_data(self, data):
        cleaned_data = {}
        for key, value in data.items():
            if value:
                cleaned_data[key] = value
        return cleaned_data

    def patch(self, request):
        try:
            print('Data before cleaning: ', request.data)
            cleaned_data = self.clean_data(request.data)
            print('Data after cleaning: ', cleaned_data)
            account = Account.objects.get(id = request.user.id)
            serializer = PatchProfileDetailsSerializer(account, data = cleaned_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                print('Serializer error: ',serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)


class FetchAvailableTimingDoctor(APIView):
    def get(self, request):
        try:
            email = request.user.email
            account = Account.objects.get(email = email)
            try:
                title = request.query_params.get('title', None)
                required_date = request.query_params.get('date', None)
                if title and required_date is not None:
                    time_zone_offset = timedelta(hours=5, minutes=30)
                    current_datetime = datetime.now() + time_zone_offset
                    current_date = current_datetime.strftime('%Y-%m-%d')
                    current_time = current_datetime.strftime('%I:%M %p')

                    title = title.replace('-', ' ')
                    list_of_doctors = DoctorSpecializations.objects.filter(specialization_title=title, doctor__is_active=True).values('doctor')
                    doctors_availability_per_day = DoctorAvailability.objects.filter(doctor__in=list_of_doctors, date=required_date)

                    data = []
                    for doctor_availability in doctors_availability_per_day:
                        doctor_data = {
                            "email": doctor_availability.doctor.email,
                            "online": [],
                            "offline": [],
                        }
                        if doctor_availability.slots_details_online:
                            online_slots = {
                                "day": str(doctor_availability.date),
                                "timings": []
                            }
                            for key, slot_data in doctor_availability.slots_details_online.items():
                                slot_time = datetime.strptime(slot_data.get('time'), '%I:%M %p')
                                if (
                                    slot_data.get('status') == 'available'
                                    and str(doctor_availability.date) == current_date
                                    and slot_time >= current_datetime
                                ):
                                    online_slots["timings"].append(slot_data.get('time'))
                                elif (
                                    slot_data.get('status') == 'available'
                                    and str(doctor_availability.date) != current_date
                                ):
                                    online_slots["timings"].append(slot_data.get('time'))

                            if online_slots["timings"]:
                                doctor_data["online"].append(online_slots)
                        
                        if doctor_availability.slots_details_offline:
                            offline_slots = {
                                "day": str(doctor_availability.date),
                                "timings": []
                            }
                            for key, slot_data in doctor_availability.slots_details_offline.items():
                                time_str = slot_data.get('time')
                                time_format = '%I:%M %p'
                                today_date = date.today()
                                combined_datetime = datetime.combine(today_date, datetime.strptime(time_str, time_format).time())
                                # print('Slot time: ', combined_datetime)
                                # print('Current time: ', current_datetime)
                                
                                if (
                                    slot_data.get('status') == 'available'
                                    and str(doctor_availability.date) == current_date
                                    and combined_datetime >= current_datetime
                                ):
                                    offline_slots["timings"].append(slot_data.get('time'))
                                elif (
                                    slot_data.get('status') == 'available'
                                    and str(doctor_availability.date) != current_date
                                ):
                                    offline_slots["timings"].append(slot_data.get('time'))

                            if offline_slots["timings"]:
                                doctor_data["offline"].append(offline_slots)

                        data.append(doctor_data)

                    # print('List of doctors serializer: ',data)
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)
                
            except DoctorSpecializations.DoesNotExist:
                return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)

        except Account.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
