from rest_framework import serializers
from authentication.models import Account
from doctors_and_labs.models import DoctorAvailability, DoctorProfile
import magic



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
    