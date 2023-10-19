from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Account
from rest_framework.response import Response
from rest_framework import status

from authentication.serializers import AllAccountSerializer
from .serializers import PatientAccountSerializer

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
            pass
        except:
            pass