from django.urls import path
from .import views

urlpatterns = [
    # View all user data
    path('', views.get_data, name='get-data'),

    # Add account, Patient, Doctor, Lab, Executive accounts
    path('add/', views.add_account, name='add-account'),
    path('patient-signup', views.patient_signup, name='patient-signup'),
    path('doctor-signup', views.doctor_signup, name='doctor-signup'),
    path('lab-signup', views.lab_signup, name='lab-signup'),
    path('executive-signup', views.executive_signup, name='add-executive'),

    #Login
    path('patient-login', views.patient_login, name='patient-login'),
    path('executive-login', views.executive_login, name='executive-login'),
    path('doctor-login', views.doctor_login, name='doctor-login'),
    path('lab-login', views.lab_login, name='lab-login'),

    #Logout
    path('logout', views.logout, name='logout')
]
