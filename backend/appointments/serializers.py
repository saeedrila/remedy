from rest_framework import serializers
from .models import Appointments



class PatientAppointmentsSerializer(serializers.ModelSerializer):
    doctor_email = serializers.SerializerMethodField()

    class Meta:
        model = Appointments
        fields = [
            'appointment_id',
            'doctor_email',
            'time',
            'status',
            'slot_type',
            'date'
        ]
    def get_doctor_email(self, obj):
        return obj.doctor.email if obj.doctor else None
