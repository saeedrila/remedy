from rest_framework import serializers
from authentication.models import Account



# Serializer for getting all user data
class AllAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('email', 'password')
