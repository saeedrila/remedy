from django.urls import path
from .import views


urlpatterns = [
    # Get doctor availability
    path('doctor-availability-get-url', views.DoctorAvailabilityRegistration.as_view(), name='doctor-availability-get-url'),
    # Get and Patch doctor account details
    path('get-doctor-account-details', views.DoctorAccountDetails.as_view(), name='doctor_account_details'),
    # Get and Post doctor specialization details
    path('doctor-specialization-generic-url', views.GetListOfSpecialization.as_view(), name='doctor_specialization_url'),
    # Specific url for getting a doctor's specialization details
    path('doctor-specialization-specific', views.DoctorSpecificSpecialization.as_view(), name='doctor_specialization_specific'),

    # Fetch available doctors on a particular specialization
    path('doctors-at-specific-specialization/', views.DoctorsListAtSpecialization.as_view(), name='doctors-at-specialization'),
]
