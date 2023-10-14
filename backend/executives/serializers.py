from rest_framework import serializers
from authentication.models import Account



class AccountActivationSerializer(serializers.Serializer):
    class Meta:
        model = Account
        fields = (
            'id',
            'username',
            'email',
            'mobile',
            'is_doctor'
            'is_lab'
            'is_executive'
            'is_verified'
            'is_active',)
        
