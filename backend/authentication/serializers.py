from rest_framework import serializers
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability, DoctorProfile



# Serializer for getting all user data
class AllAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'id',
            'username',
            'email',
            'is_executive',
            'is_doctor',
            'is_lab',
            'is_patient',
            'is_verified',
            'is_active',
            'is_superuser')

# Serializer for user registration
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')

#Login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

# User activation/disable serializer
class UserActivationSerializer(serializers.Serializer):
    id = serializers.CharField()
    is_active = serializers.BooleanField()