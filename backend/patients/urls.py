from django.urls import path
from .import views

urlpatterns = [
  # Get patient profile details from 'Account' model
  path('get-patient-profile-details', views.GetPatientProfileDetails.as_view(), name='get-patient-profile-detials'),
  # Get available timing of doctors
  path('fetch-available-timing-doctor', views.GetPatientProfileDetails.as_view(), name='fetch-available-timing-doctor'),
]

