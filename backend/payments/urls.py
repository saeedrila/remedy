from django.urls import path
from .import views


urlpatterns = [
# Razorpay payment testing
    path('checkout-payment', views.CheckoutPayment.as_view(), name='checkout-payment'),
]