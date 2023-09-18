from django.db import models
from django.utils.timezone import now

class Payments(models.Model):
    appointment = models.CharField(max_length=20)
    amount = models.PositiveIntegerField()
    date = models.DateTimeField(default=now)
    mode_of_payment = models.CharField(max_length=20)
    razorpay_paid = models.BooleanField(default=False, null=True)
    razorpay_order_id = models.CharField(max_length=100, null=True)
    razorpay_payment_id = models.CharField(max_length=100, null=True)
    razorpay_payment_signature = models.CharField(max_length=100, null=True)

    def __str__(self):
        return str(self.id)