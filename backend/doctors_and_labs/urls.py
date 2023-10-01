from django.urls import path
from .import views


urlpatterns = [
    # Register specialization
    path('register-specialization', views.RegisterSpecialization.as_view(), name='register-specialization'),


    # Frontend
    # Get doctor specialization details
    path('doctor-specialization-data', views.DoctorSpecializationData.as_view(), name='doctor-specialization-data'),

    # Fetch available doctors on a particular specialization
    path('doctors-at-specialization/<int:specialtyId>/', views.DoctorSpecializationDetail.as_view(), name='doctors-at-specialization'),

    # Register doctor's available timing
    path('doctor-availability-registration', views.DoctorAvailabilityRegistration.as_view(), name='doctor-availability-registration'),
]
