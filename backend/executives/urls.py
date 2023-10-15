from django.urls import path
from .import views

urlpatterns = [
    path('account-approval', views.AccountApproval.as_view(), name='account_approval'),
]
