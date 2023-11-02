from django.db import models
from django.utils.timezone import now

class Payments(models.Model):
    appointment = models.CharField(max_length=20, null=True)
    amount = models.PositiveIntegerField()
    staff_payment = models.PositiveIntegerField(null=True, blank=True)
    platform_fee = models.PositiveIntegerField(null=True, blank=True)
    date = models.DateTimeField(default=now)
    mode_of_payment = models.CharField(max_length=20)
    razorpay_paid = models.BooleanField(default=False, null=True)
    razorpay_order_id = models.CharField(max_length=100, null=True)
    razorpay_payment_id = models.CharField(max_length=100, null=True)
    razorpay_payment_signature = models.CharField(max_length=100, null=True)
    appointment_completion = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.id)
