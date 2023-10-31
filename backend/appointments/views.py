from django.shortcuts import render
from rest_framework.views import APIView



class FetchPatientAppointData(APIView):
    def get(self, request):
        pass