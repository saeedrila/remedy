from django.db import models
from authentication.models import Account


#Doctor related Models
class DoctorProfile(models.Model):
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE) #Related name
    fee_per_session = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    experience = models.PositiveIntegerField(default=0, null=True)
    description = models.TextField(null=True)
    document = models.FileField(upload_to='doctor_documents/', null=True)

class DoctorSpecializationsAvailable(models.Model):
    specialization_title = models.CharField(max_length=40)

class DoctorAvailability(models.Model):
    date = models.DateField(db_index=True)
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slots_status = models.JSONField(default=dict)

class DoctorSpecializations(models.Model):
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE)
    specialization = models.ForeignKey(DoctorSpecializationsAvailable, on_delete=models.CASCADE)


# Lab related Models
class LabProfile(models.Model):
    lab = models.ForeignKey(Account, on_delete=models.CASCADE)
    experience = models.PositiveIntegerField(default=0)
    description = models.TextField(null=True)
    document = models.FileField(upload_to='lab_documents/', null=True)

class LabTestsAvailable(models.Model):
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    name = models.CharField(max_length=50, db_index=True)
    description = models.TextField(null=True)
    fee = models.PositiveIntegerField(db_index=True)

class LabAvailability(models.Model):
    date = models.DateField(db_index=True)
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slots_status = models.JSONField()
