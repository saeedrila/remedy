from django.urls import path
from .import views


urlpatterns = [
# Razorpay payment testing
    path('checkout_payment', views.CheckoutPayment.as_view(), name='checkout-payment'),
    path('razorpay/order/create', views.RazorpayOrder.as_view(), name='razorpay-order-create'),
    path('razorpay/order/complete', views.RazorpayOrderComplete.as_view(), name='razorpay-order-complete'),

    #Payment list fetching
    path('fetch-executive-payments', views.GetExecutivePaymentList.as_view(), name='fetch-executive-payments'),
    path('fetch-doctor-payments', views.GetDoctorPaymentList.as_view(), name='fetch-doctor-payments'),
]