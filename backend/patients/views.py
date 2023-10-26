from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Account
from rest_framework.response import Response
from rest_framework import status

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
    DoctorAvailabilitySerializer,
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


class FetchAvailableTimingDoctor(APIView):
    def get(self, request):
        try:
            email = request.user.email
            account = Account.objects.get(email = email)

            try:
                title = request.query_params.get('title', None)
                required_date = request.query_params.get('required_date', None)
                if title and required_date is not None:
                    title = title.replace('-', ' ')
                    list_of_doctors = DoctorSpecializations.objects.filter(specialization_title=title).values('doctor')
                    
                    doctors_availability_per_day = DoctorAvailability.objects.filter(doctor__in=list_of_doctors, date=required_date)

                    data = []

                    for doctor_availability in doctors_availability_per_day:
                        doctor_data = {
                            "email": doctor_availability.doctor.email,
                            "online": [],
                            "offline": [],
                        }
                        if doctor_availability.slots_status_online:
                            online_slots = {
                                "day": str(doctor_availability.date),
                                "timings": doctor_availability.slots_details_online
                            }
                            doctor_data["online"].append(online_slots)

                        if doctor_availability.slots_status_offline:
                            offline_slots = {
                                "day": str(doctor_availability.date),
                                "timings": doctor_availability.slots_details_offline
                            }
                            doctor_data["offline"].append(offline_slots)

                        data.append(doctor_data)
                        
                    print('List of doctors serializer: ',data)
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)
            except DoctorSpecializations.DoesNotExist:
                return Response({"detail": "Specialization not found"}, status=status.HTTP_404_NOT_FOUND)

        except Account.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
