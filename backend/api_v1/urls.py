from django.urls import path
from .import views



urlpatterns = [
    # Profile updation
    path('profile-update', views.profile_update, name='profile-update'),

]
