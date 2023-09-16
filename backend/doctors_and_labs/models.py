from django.db import models
from backend.authentication.models import Account


#Doctor related Models
class DoctorDetails(models.Model):
    doctor_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    charge_per_session = models.PositiveIntegerField()
    experience = models.PositiveIntegerField()
    document = models.FieldFile(upload_to='doctor_documents/')

class DoctorSpecializationsAvailable(models.Model):
    specialization_title = models.CharField(max_length=40)

class DoctorAvailability(models.Model):
    date = models.DateField(null=True, db_index=True)
    doctor_id = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slots_status = models.JSONField()

class DoctorSpecializations(models.Model):
    doctor_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    specialization = models.ForeignKey(DoctorSpecializationsAvailable, on_delete=models.CASCADE)


# Lab related Models
class LabDetails(models.Model):
    lab_id = models.ForeignKey(Account, on_delete=models.CASCADE)
    experience = models.PositiveIntegerField()
    description = models.TextField(null=True)
    document = models.FieldFile(upload_to='lab_documents/')

class LabTestsAvailable(models.Model):
    lab_id = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    test_name = models.CharField(max_length=50, db_index=True)
    test_description = models.TextField(null=True)
    test_charge = models.PositiveIntegerField(db_index=True)

class LabAvailability(models.Model):
    date = models.DateField(null=True, db_index=True)
    lab_id = models.ForeignKey(Account, on_delete=models.CASCADE, db_index=True)
    slots_status = models.JSONField()
