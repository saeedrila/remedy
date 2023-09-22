from django.db import models
from authentication.models import Account

class PatientProfile(models.Model):
    patient = models.ForeignKey(Account, on_delete=models.CASCADE)
    description = models.TextField(null=True)
    document = models.FileField(upload_to='patient_documents/', null=True)
    