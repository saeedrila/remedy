from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_data, name='get-data'),
    path('add/', views.add_account, name='add-account'),
    path('patient-signup', views.add_patient, name='add-patinet'),
    path('doctor-signup', views.add_doctor, name='add-doctor'),
    path('lab-signup', views.add_lab, name='add-lab'),
    path('executive-signup', views.add_executive, name='add-executive'),
]
