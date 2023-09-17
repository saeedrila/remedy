from django.db import models
from django.utils.timezone import now

class Payments(models.Model):
    appointment = models.CharField(max_length=12)
    amount = models.PositiveIntegerField(default=0)
    date = models.DateTimeField(default=now)
    mode_of_payment = models.CharField(max_length=20)
    razorpay_paid = models.BooleanField(default=False, null=True, blank=True)
    razorpay_order_id = models.CharField(max_length=100, null=True, blank=True)
    razorpay_payment_id = models.CharField(max_length=100, null=True, blank=True)
    razorpay_payment_signature = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return str(self.id)