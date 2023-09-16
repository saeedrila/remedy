from django.db import models
from backend.authentication.models import Account


#Doctor related Models
class DoctorDetails(models.Model):
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE)
    charge_per_session = models.PositiveIntegerField()
    experience = models.PositiveIntegerField()
    description = models.TextField(null=True)
    document = models.FieldFile(upload_to='doctor_documents/')

class DoctorSpecializationsAvailable(models.Model):
    specialization_title = models.CharField(max_length=40)

class DoctorAvailability(models.Model):
    date = models.DateField(null=True, db_index=True)
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slot_type = models.CharField(max_length=10)
    slots_status = models.JSONField()

class DoctorSpecializations(models.Model):
    doctor = models.ForeignKey(Account, on_delete=models.CASCADE)
    specialization = models.ForeignKey(DoctorSpecializationsAvailable, on_delete=models.CASCADE)


# Lab related Models
class LabDetails(models.Model):
    lab = models.ForeignKey(Account, on_delete=models.CASCADE)
    experience = models.PositiveIntegerField()
    description = models.TextField(null=True)
    document = models.FieldFile(upload_to='lab_documents/')

class LabTestsAvailable(models.Model):
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    name = models.CharField(max_length=50, db_index=True)
    description = models.TextField(null=True)
    charge = models.PositiveIntegerField(db_index=True)

class LabAvailability(models.Model):
    date = models.DateField(null=True, db_index=True)
    lab = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slots_status = models.JSONField()
