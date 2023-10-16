from rest_framework import serializers
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability, DoctorProfile, DoctorSpecializations



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

# Doctor status get, following 2 classes are part of it.
# Not using anymore
class SlotSerializer(serializers.Serializer):
    time = serializers.CharField()
    status = serializers.CharField()

class DoctorAvailabilitySerializer(serializers.Serializer):
    date = serializers.CharField()
    slots_status_online = serializers.BooleanField()
    slots_status_offline = serializers.BooleanField()
    slots_details_online = SlotSerializer(many=True)
    slots_details_offline = SlotSerializer(many=True)


class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = ('fee_per_session', 'experience', 'description')

