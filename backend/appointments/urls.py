from django.urls import path
from .import views

urlpatterns = [
    path('fetch-patient-appointments', views.FetchPatientAppointData.as_view(), name='fetch_patient_appointments'),
    path('fetch-doctor-appointments', views.FetchDoctorAppointData.as_view(), name='fetch_doctor_appointments'),
    path('fetch-all-appointments', views.FetchAllAppointData.as_view(), name='fetch_all_appointments'),
]