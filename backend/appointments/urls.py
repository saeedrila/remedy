from django.urls import path
from .import views

urlpatterns = [
    path('fetch-patient-appointments', views.FetchPatientAppointData.as_view(), name='fetch_patient_appointments'),
    
]