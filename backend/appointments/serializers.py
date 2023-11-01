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

class DoctorAppointmentsSerializer(serializers.ModelSerializer):
    patient_email = serializers.SerializerMethodField()
    class Meta:
        model = Appointments
        fields = [
            'appointment_id',
            'patient_email',
            'time',
            'status',
            'slot_type',
            'date'
        ]
    def get_patient_email(self, obj):
        return obj.patient.email if obj.patient else None