from django.urls import path
from .import views


urlpatterns = [
    # File upload
    path('upload-profile-image', views.ProfileImage.as_view(), name='upload-profile-image'),

]
