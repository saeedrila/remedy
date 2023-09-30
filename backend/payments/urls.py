from django.urls import path
from .import views


urlpatterns = [
# Razorpay payment testing
    path('checkout-payment', views.checkout_payment, name='checkout-payment'),
]