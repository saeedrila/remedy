from rest_framework.response import Response
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction
import razorpay

from .serializers import (
    RazorpayTransactionSerializer,
    RazorpayOrderSerializer,
    ExecutivePaymentListSerializer,
    PatientPaymentListSerializer,
)
from .models import Payments
from appointments.models import Appointments
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability



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
            serializer = RazorpayOrderSerializer(data=request.data)
            if serializer.is_valid():
                account = Account.objects.get(id=request.user.id)
                amount = serializer.validated_data.get('amount')
                currency = serializer.validated_data.get('currency')
                doctor_email = serializer.validated_data.get('doctor_email')
                date = serializer.validated_data.get('date')
                line = serializer.validated_data.get('line')
                time_slot = serializer.validated_data.get('time_slot')

            if not doctor_email:
                return Response({'error': 'Doctor email is missing in request data.'}, status=status.HTTP_BAD_REQUEST)
            
            try:
                doctor_account = Account.objects.get(email=doctor_email)
            except Account.DoesNotExist:
                    return Response({'error': 'Doctor with the provided email does not exist.'}, status=status.HTTP_BAD_REQUEST)

            amount_in_ps = amount * 100
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
            payment = client.order.create({'amount': amount_in_ps, 'currency': currency})
            print('Razorpay Integration',payment)

            payment_entry = Payments.objects.create(
                amount = amount_in_ps, 
                mode_of_payment = 'Razorpay', 
                razorpay_paid = False,
                razorpay_order_id = payment['id']
            )
            appointment_entry = Appointments.objects.create(
                patient = account,
                doctor = doctor_account,
                date = date,
                slot_type = line,
                time = time_slot,
                status = 'Draft',
                payment = payment_entry,
            )
            payment_entry.appointment = appointment_entry.appointment_id
            payment_entry.save()

            print('Payment Entry: ', payment_entry)
            print('Appointment Entry: ', appointment_entry)
            return Response(payment, status=status.HTTP_201_CREATED)
        
        except Exception as error:
            print('Razorpay order creation Error:', error)
            return Response({'error': 'Razorpay order creation Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RazorpayOrderComplete(APIView):
    def post(self, request):
        serializer = RazorpayTransactionSerializer(data=request.data)
        if serializer.is_valid():
            payment_id = serializer.validated_data.get('payment_id')
            order_id = serializer.validated_data.get('order_id')
            signature = serializer.validated_data.get('signature')
            try:
                with transaction.atomic():
                    payment_obj = Payments.objects.get(razorpay_order_id=order_id)
                    if payment_obj.razorpay_paid:
                        return Response({'error': 'Payment already marked as complete'}, status=status.HTTP_BAD_REQUEST)
                    payment_obj.razorpay_payment_id = payment_id
                    payment_obj.signature = signature
                    payment_obj.save()
                    appointment_obj = Appointments.objects.get(appointment_id=payment_obj.appointment)
                    appointment_obj.status = 'Booked'
                    appointment_obj.save()

                doctor_availability_obj = DoctorAvailability.objects.get(date=appointment_obj.date, doctor_id=appointment_obj.doctor_id)
                target_time = appointment_obj.time
                new_status = "1"

                if appointment_obj.slot_type == 'offline':
                    slots_details = doctor_availability_obj.slots_details_offline
                else:
                    slots_details = doctor_availability_obj.slots_details_online

                for slot_key, slot_info in slots_details.items():
                    if slot_info["time"] == target_time:
                        slot_info["status"] = new_status

                if appointment_obj.slot_type == 'offline':
                    doctor_availability_obj.slots_details_offline = slots_details
                else:
                    doctor_availability_obj.slots_details_online = slots_details

                doctor_availability_obj.save()

            except Payments.DoesNotExist:
                    return Response({'error': 'Payment error saving on db error'}, status=status.HTTP_BAD_REQUEST)
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetExecutivePaymentList(APIView):
    def get(self, request):
        payments_obj = Payments.objects.filter(appointment_completion = True)
        payments_data = [{
            'appointment': payment.appointment, 
            'staff_payment': payment.staff_payment//100, 
            'platform_fee': payment.platform_fee//100, 
            'amount': payment.amount//100
            } for payment in payments_obj]
        for payment_data in payments_data:
            appointment_id = payment_data['appointment']
            try:
                appointment_obj = Appointments.objects.get(appointment_id=appointment_id)
                payment_data['date'] = appointment_obj.date
            except Appointments.DoesNotExist:
                payment_data['date'] = None

        serializer = ExecutivePaymentListSerializer(data=payments_data, many=True)
        if not serializer.is_valid():
            print('Serializer Error: ', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetDoctorPaymentList(APIView):
    def get(self, request):
        payments_obj = Payments.objects.filter(appointment_completion=True)
        payments_data = [{
            'appointment': payment.appointment, 
            'staff_payment': payment.staff_payment//100, 
            'platform_fee': payment.platform_fee//100, 
            'amount': payment.amount//100
            } for payment in payments_obj]
        for payment_data in payments_data:
            appointment_id = payment_data['appointment']
            try:
                appointment_obj = Appointments.objects.get(appointment_id=appointment_id)
                if not appointment_obj.doctor_id==request.user:
                    pass
                payment_data['date'] = appointment_obj.date
            except Appointments.DoesNotExist:
                payment_data['date'] = None

        serializer = ExecutivePaymentListSerializer(data=payments_data, many=True)
        if not serializer.is_valid():
            print('Serializer Error: ', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetPatientPaymentList(APIView):
    def get(self, request):
        appointments_obj = Appointments.objects.filter(patient=request.user)
        appointment_data = [{
            'appointment': appointment.appointment_id,
            'amount': appointment.payment.amount//100, 
            'date': appointment.date, 
            'status': appointment.status
            } for appointment in appointments_obj]

        serializer = PatientPaymentListSerializer(data=appointment_data, many=True)
        if not serializer.is_valid():
            print('Serializer Error: ', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_200_OK)
