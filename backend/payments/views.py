from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import razorpay



@csrf_exempt
@api_view(['GET'])
def checkout_payment(request):
    try:
        net_total = 10500
        amount = int(net_total)
        client = razorpay.Client(auth =(settings.RAZORPAY_KEY,settings.RAZORPAY_SECRET))
        payment = client.order.create ({'amount' : amount, 'currency': 'INR', 'payment_capture': '1'})
        print('********** Razorpay Integration **********')
        print(payment)
        print('*******************************************')

    except Exception as e:
        print('********** Razorpay Integration Error **********')
        print('Error:', e)
        print('***********************************************')

    return Response(payment, status=200)
