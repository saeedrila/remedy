from rest_framework import serializers
from authentication.models import Account



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
            'is_patient')

# Serializer for user registration
class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')
