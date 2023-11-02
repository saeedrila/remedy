from django.urls import path
from .import views


urlpatterns = [
    path('chat', views.ChatAPIView.as_view(), name='chat-api-view'),
]
