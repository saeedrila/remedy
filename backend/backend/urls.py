from django.contrib import admin
from django.urls import path, include



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api_v1.urls')),
    path('api/', include('appointments.urls')),
    path('api/', include('authentication.urls')),
    path('api/', include('chat.urls')),
    path('api/', include('doctors_and_labs.urls')),
    path('api/', include('executives.urls')),
    path('api/', include('patients.urls')),
    path('api/', include('payments.urls')),
    # path('api/', include('reports.urls')),
    # path('api/', include('video_call.urls')),
]
