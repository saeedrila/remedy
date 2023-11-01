from django.urls import path
from .import views



urlpatterns = [
  # Get patient profile details from 'Account' model
  path('get-patient-profile-details', views.GetPatientProfileDetails.as_view(), name='get-patient-profile-detials'),
  path('patch-profile-details', views.PatchProfileDetails.as_view(), name='patch-profile-detials'),

  # Get available timing of doctors
  path('fetch-per-day-availability-of-specialized-doctor/', views.FetchAvailableTimingDoctor.as_view(), name='fetch-per-day-availability-of-sepecialized-doctor'),
]
