from django.urls import path
from .import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    # Refresh and access tokens
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # for obtaining access tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # for refreshing tokens

    # View all user data
    path('', views.get_data, name='get-data'),

    # Signup, Login, and Logout API endpoints
    # Add account, Patient, Doctor, Lab, Executive accounts
    path('add/', views.add_account, name='add-account'),
    path('patient-signup', views.patient_signup, name='patient-signup'),
    path('doctor-signup', views.doctor_signup, name='doctor-signup'),
    path('lab-signup', views.lab_signup, name='lab-signup'),
    path('executive-signup', views.executive_signup, name='add-executive'),

    # Login
    path('patient-login', views.patient_login, name='patient-login'),
    path('executive-login', views.executive_login, name='executive-login'),
    path('doctor-login', views.doctor_login, name='doctor-login'),
    path('lab-login', views.lab_login, name='lab-login'),

    # Logout
    path('logout', views.logout_view, name='logout-view'),


    # Activate user
    path('activate-user', views.activate_user, name='activate-user'),


    # Profile updation
    path('profile-update', views.profile_update, name='profile-update'),


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
