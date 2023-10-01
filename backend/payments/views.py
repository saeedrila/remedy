from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import status

import razorpay



class CheckoutPayment(APIView):
    @csrf_exempt # While developing, remove on production
    def get(self, request):
        try:
            net_total = 10500
            amount = int(net_total)
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
            payment = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
            print('********** Razorpay Integration **********')
            print(payment)
            print('*******************************************')

            return Response(payment, status=status.HTTP_200_OK)
        except Exception as e:
            print('********** Razorpay Integration Error **********')
            print('Error:', e)
            print('***********************************************')
            return Response({'error': 'Razorpay Integration Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
