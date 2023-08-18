from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_data, name='get-data'),
    path('add/', views.add_account, name='add-account')
]
