from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import status
import razorpay

from .serializers import RazorpayTransactionSerializer
from .models import Payments



class CheckoutPayment(APIView):
    @csrf_exempt # While developing, remove on production
    def get(self, request):
        try:
            net_total = 10500
            amount = int(net_total)
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
            payment = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
            print('Razorpay Integration',payment)
            return Response(payment, status=status.HTTP_200_OK)
        
        except Exception as error:
            print('Razorpay order creation Error:', error)
            return Response({'error': 'Razorpay order creation Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RazorpayOrder(APIView):
    def post(self, request):
        try:
            net_total = 40000
            amount = int(net_total)
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
            payment = client.order.create({'amount': amount, 'currency': 'INR'})
            print('Razorpay Integration',payment)
            payment_entry = Payments.objects.create(
                amount = amount, 
                mode_of_payment = 'Razorpay', 
                razorpay_paid = False,
                razorpay_order_id = payment['id']
            )
            return Response(payment, status=status.HTTP_201_CREATED)
        
        except Exception as error:
            print('Razorpay order creation Error:', error)
            return Response({'error': 'Razorpay order creation Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RazorpayOrderComplete(APIView):
    def post(self, request):
        transaction_serializer = RazorpayTransactionSerializer(data=request.data)
        if transaction_serializer.is_valid():
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
