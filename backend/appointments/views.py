from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Account
from appointments.models import Appointments
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist

from .serializers import (
    PatientAppointmentsSerializer,
)


class FetchPatientAppointData(APIView):
    def get(self, request):
        try:
            account = Account.objects.get(id = request.user.id)
            print('Account: ', account)
            appointments_list = Appointments.objects.filter(patient_id=account).order_by('-order_created')
            print('Appointment list: ', appointments_list)
            serializer = PatientAppointmentsSerializer(appointments_list, many=True)
            print('Serialized data: ', serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Account not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': 'Error occurred'}, status=status.HTTP_400_BAD_REQUEST)
        
