from django.db import models
from authentication.models import Account
from doctors_and_labs.models import DoctorSpecializationsAvailable, LabTestsAvailable
from payments.models import Payments
import uuid

class Appointments(models.Model):
    appointment_id = models.CharField(max_length=12, unique=True, primary_key=True)
    patient = models.ForeignKey(Account, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    specialization = models.ForeignKey(DoctorSpecializationsAvailable, on_delete=models.CASCADE, null=True)
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    labtest = models.ForeignKey(LabTestsAvailable, on_delete=models.CASCADE, null=True)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=20)
    payment_id = models.ForeignKey(Payments, on_delete=models.CASCADE)
    slot_type = models.CharField(max_length=10)
    order_created = models.DateField(auto_now_add=True)
    document = models.FieldFile(upload_to='appointment_documents/')

    def save(self, *args, **kwargs):
        if not self.appointment_id:
            prefix = 'rmdy-'
            uuid_string = str(uuid.uuid4())[:8]
            self.appointment_id = prefix + uuid_string
        super(Appointments, self).save(*args, **kwargs)