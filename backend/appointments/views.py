from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Account
from appointments.models import Appointments
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from .serializers import (
    PatientAppointmentsSerializer,
    DoctorAppointmentsSerializer,
    AllAppointmentsSerializer,
    PrescriptionSerializer,
)


class FetchPatientAppointData(APIView):
    def get(self, request):
        try:
            account = Account.objects.get(id = request.user.id)
            appointments_list = Appointments.objects.filter(patient_id=account).order_by('-order_created')
            serializer = PatientAppointmentsSerializer(appointments_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Error occurred'}, status=status.HTTP_400_BAD_REQUEST)

#Fetch appointments for doctor dashboard
class FetchDoctorAppointData(APIView):
    def get(self, request):
        try:
            account = Account.objects.get(id = request.user.id)
            # print('Account: ', account)
            appointments_list = Appointments.objects.filter(doctor_id=account).order_by('-order_created')
            # print('Appointment list: ', appointments_list)
            serializer = DoctorAppointmentsSerializer(appointments_list, many=True)
            # print('Serialized data: ', serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Error occurred'}, status=status.HTTP_400_BAD_REQUEST)
        
#Fetch appointment for Executive dashboard
class FetchAllAppointData(APIView):
    def get(self, request):
        try:
            appointments_list = Appointments.objects.order_by('-order_created')
            # print('Appointment list: ', appointments_list)
            serializer = AllAppointmentsSerializer(appointments_list, many=True)
            # print('Serialized data: ', serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Error occurred'}, status=status.HTTP_400_BAD_REQUEST)
        
class AppointmentPrescription(APIView):
    def get(self, request):
        appointment_id = request.query_params.get('appointment_id')
        try:
            appointment = Appointments.objects.get(appointment_id=appointment_id)
            serializer = PrescriptionSerializer({
                'appointment_id': appointment.appointment_id,
                'prescription': appointment.prescription,
            })

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Appointments.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request):
        print(request.data)
        serializer = PrescriptionSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        appointment_id = serializer.validated_data.get('appointment_id')
        prescription = serializer.validated_data.get('prescription')

        try:
            appointment = Appointments.objects.get(appointment_id=appointment_id)
            appointment.prescription = prescription
            appointment.status = 'Completed'
            appointment.save()


            return Response({"message": "Prescription updated successfully"}, status=status.HTTP_200_OK)

        except Appointments.DoesNotExist:
            return Response({"error": "Appointment not found"}, status=status.HTTP_404_NOT_FOUND)

        