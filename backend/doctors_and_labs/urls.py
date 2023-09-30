from django.urls import path
from .import views


urlpatterns = [
    # Register specialization
    path('register-specialization', views.register_specialization, name='register-specialization'),


    # Frontend
    # Get doctor specialization details
    path('doctor-specialization-data', views.doctor_specialization_data, name='doctor-specialization-data'),

    # Fetch available doctors on a particular specialization
    path('doctors-at-specialization/<int:specialtyId>', views.doctors_at_specialization, name='doctors-at-specialization'),

    # Register doctor's available timing
    path('doctor-availability-registration', views.doctor_availability_registration, name='doctor-availability-registration'),
]
