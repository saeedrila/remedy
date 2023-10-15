from rest_framework import serializers
from authentication.models import Account



class AccountApprovalSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField()
    mobile = serializers.CharField()
    is_doctor = serializers.BooleanField()
    is_lab = serializers.BooleanField()
    is_executive = serializers.BooleanField()
    is_verified = serializers.BooleanField()
    is_active = serializers.BooleanField()

class AccountApprovalPatchSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    status = serializers.BooleanField()

