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
            'mobile',
            'gender',
            'age',
            'blood_group',
            'profile_pic_url',
            'address',
            'date_joined',
            'last_login',
            'is_executive',
            'is_doctor',
            'is_lab',
            'is_patient',
            'is_admin',
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

# Change password
class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
