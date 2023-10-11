from django.urls import path
from .import views
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    # Refresh and access tokens
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # for obtaining access tokens
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # for refreshing tokens

    # View all user data
    path('', views.AllAccountListView.as_view(), name='all-account-list'),

    # Signup, Login, and Logout API endpoints
    # Add account, Patient, Doctor, Lab, Executive accounts
    path('add/', views.AddAccount.as_view(), name='add-account'),
    path('account-signup', views.AccountSignup.as_view(), name='account-signup'),
    path('account-login', views.AccountLogin.as_view(), name='patient-login'),
    path('logout', views.LogoutView.as_view(), name='logout-view'),
    path('change-password', views.ChangePassword.as_view(), name='change-password'),


    # Activate user by Executive
    path('activate-user', views.ActivateUser.as_view(), name='activate-user'),
]