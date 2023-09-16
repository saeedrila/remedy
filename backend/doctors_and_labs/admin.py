from django.contrib import admin
from .models import DoctorDetails, DoctorAvailability, DoctorSpecializations, DoctorSpecializationsAvailable
from .models import LabAvailability, LabDetails, LabTestsAvailable

# Doctor related
class DoctorDetailsAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'charge_per_session', 'experience', 'description', 'document')
    list_filter = ('doctor', 'experience')

admin.site.register(DoctorDetails, DoctorDetailsAdmin)
admin.site.register(DoctorSpecializationsAvailable)


# Lab related
class LabDetailsAdmin(admin.ModelAdmin):
    list_display = ('lab', 'experience', 'description', 'document')
    list_filter = ('lab', 'experience')

admin.site.register(LabDetails, LabDetailsAdmin)
admin.site.register(LabTestsAvailable)
