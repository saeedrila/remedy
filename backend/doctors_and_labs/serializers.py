from rest_framework import serializers
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability, DoctorProfile



# Doctor specialization registration
class RegisterSpecialization(serializers.Serializer):
    specialization = serializers.CharField(max_length=40)


# Doctor specialization data for the frontend
class DoctorSpecializationData(serializers.Serializer):
    id = serializers.CharField()
    specialization = serializers.CharField()

# Doctor availability registration
class DoctorAvailabilityRegistration(serializers.Serializer):
    date = serializers.CharField(max_length=10)


class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ('fee_per_session',)

class DoctorAvailabilitySerializer(serializers.Serializer):
    doctorprofile = DoctorProfileSerializer(source='doctor', read_only=True)
    availability_ids = serializers.SerializerMethodField()

    class Meta:
        model = DoctorAvailability
        fields = ('doctor_id', 'fee_per_session', 'availability_ids')

    def get_availability_ids(self, obj):
        return [availability.id for availability in obj]
