from django.db import models
from authentication.models import Account
from doctors_and_labs.models import LabTestsAvailable
from payments.models import Payments
import uuid

class Appointments(models.Model):
    appointment_id = models.CharField(max_length=12, unique=True, primary_key=True)
    patient = models.ForeignKey(Account, on_delete=models.CASCADE, related_name='patient_appointments')
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name='doctor_appointments')
    specialization_title = models.CharField(max_length=40, null=True)
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name='lab_appointments')
    lab_test = models.ForeignKey(LabTestsAvailable, on_delete=models.CASCADE, null=True)
    date = models.DateField()
    time = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    payment = models.ForeignKey(Payments, on_delete=models.CASCADE)
    slot_type = models.CharField(max_length=10)
    order_created = models.DateTimeField(auto_now_add=True)
    document = models.FileField(upload_to='appointment_documents/', null=True)
    prescription = models.TextField(max_length=500, null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.appointment_id:
            prefix = 'rmdy'
            uuid_string = str(uuid.uuid4())[:8]
            self.appointment_id = prefix + uuid_string
        super(Appointments, self).save(*args, **kwargs)

    # Status can be: Draft, Booked, Completed, Cancelled, Refused