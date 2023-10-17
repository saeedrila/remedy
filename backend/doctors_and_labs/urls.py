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




    # Register specialization
    path('register-specialization', views.RegisterSpecialization.as_view(), name='register-specialization'),

    # Frontend
    # Get doctor specialization details
    path('doctor-specialization-data', views.DoctorSpecializationData.as_view(), name='doctor-specialization-data'),

    # Fetch available doctors on a particular specialization
    path('doctors-at-specialization/<int:specialtyId>/', views.DoctorSpecializationDetail.as_view(), name='doctors-at-specialization'),

    # Register doctor's available timing
    # Not using currently
    path('doctor-availability-registration', views.DoctorAvailabilityRegistration.as_view(), name='doctor-availability-registration'),





]
