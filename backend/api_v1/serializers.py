from rest_framework import serializers
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability, DoctorProfile
import magic


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

# Executive profile updation serializer
class ProfileUpdate(serializers.Serializer):
    def validate_fee_per_session(self, value):
        if value < 0:
            raise serializers.ValidationError("Fee per session cannot be negative.")
        return value

    def validate_experience(self, value):
        if value < 0:
            raise serializers.ValidationError("Experience cannot be negative.")
        return value

    def validate_document(self, value):
        max_file_size = 10 * 1024 * 1024
        if value.size > max_file_size:
            raise serializers.ValidationError("Document file size exceeds the allowed limit (10MB).")
        
        allowed_file_types = ["application/pdf", "image/jpeg", "image/png"]

        file_mime = magic.Magic()
        mime_type = file_mime.from_buffer(value.read(1024))

        if mime_type not in allowed_file_types:
            raise serializers.ValidationError("Invalid file type. Allowed types: PDF, JPEG, PNG.")

        value.seek(0)

        return value
    
    username = serializers.CharField(max_length=30, required=False)
    mobile = serializers.CharField(max_length=20, required=False)
    gender = serializers.CharField(max_length=10, required=False)
    age = serializers.IntegerField(required=False)
    blood_group = serializers.CharField(max_length=5, required=False)
    profile_pic_url = serializers.CharField(max_length=100, required=False)
    address = serializers.CharField(max_length=100, required=False)
    fee_per_session = serializers.DecimalField(max_digits=6, decimal_places=2, required=False, validators=[validate_fee_per_session])
    experience = serializers.IntegerField(required=False, validators=[validate_experience])
    description = serializers.CharField(max_length=255, required=False)
    document = serializers.FileField(required=False, validators=[validate_document])

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
