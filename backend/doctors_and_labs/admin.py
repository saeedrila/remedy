from django.contrib import admin
from .models import DoctorProfile
from .models import LabProfile, LabTestsAvailable

# Doctor related
class DoctorDetailsAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'fee_per_session', 'experience', 'description', 'document')
    list_filter = ('doctor', 'experience')

admin.site.register(DoctorProfile, DoctorDetailsAdmin)


# Lab related
class LabDetailsAdmin(admin.ModelAdmin):
    list_display = ('lab', 'experience', 'description', 'document')
    list_filter = ('lab', 'experience')

admin.site.register(LabProfile, LabDetailsAdmin)
admin.site.register(LabTestsAvailable)
