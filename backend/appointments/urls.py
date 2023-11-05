from django.urls import path
from .import views

urlpatterns = [
    path('fetch-patient-appointments', views.FetchPatientAppointData.as_view(), name='fetch_patient_appointments'),
    path('fetch-doctor-appointments', views.FetchDoctorAppointData.as_view(), name='fetch_doctor_appointments'),
    path('fetch-all-appointments', views.FetchAllAppointData.as_view(), name='fetch_all_appointments'),

    # Get and patch prescription
    path('fetch-prescription', views.AppointmentPrescription.as_view(), name='fetch-prescription'),
    path('patch-prescription', views.AppointmentPrescription.as_view(), name='fetch-prescription'),
    path('fetch-patient-prescription', views.AppointmentPrescription.as_view(), name='fetch-patient-prescription'),

    
    # Get data for dashboard
    path('fetch-executive-dashboard-data',views.FetchExecutiveDashboardData.as_view(), name='fetch-executive-dashboard-data'),
    path('fetch-doctor-dashboard-data',views.FetchDoctorDashboardData.as_view(), name='fetch-doctor-dashboard-data'),
]