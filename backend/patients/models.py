from django.db import models
from authentication.models import Account

class PatientProfile(models.Model):
    patient = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField(null=True)
    document = models.FileField(upload_to='patient_documents/', null=True)
    