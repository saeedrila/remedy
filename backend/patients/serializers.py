from rest_framework import serializers
from authentication.models import Account

# Serializer for getting patient profile details
class PatientAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id',
            'username',
            'email',
            'mobile',
            'gender',
            'age',
            'blood_group',
            'profile_pic_url',
            'address',
            'is_verified',)
        
class DoctorAvailabilitySerializer(serializers.Serializer):
    pass