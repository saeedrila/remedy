from django.urls import path
from .import views


urlpatterns = [
# Razorpay payment testing
    path('checkout_payment', views.CheckoutPayment.as_view(), name='checkout-payment'),
    path('razorpay/order/create', views.RazorpayOrder.as_view(), name='razorpay-order-create'),
    path('razorpay/order/complete', views.RazorpayOrderComplete.as_view(), name='razorpay-order-complete'),
]