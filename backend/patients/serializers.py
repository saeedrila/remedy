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

class PatchProfileDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['username', 'mobile', 'gender', 'age', 'blood_group', 'address']

    def update(self, instance, validated_data):
        # Update the instance with the validated data
        instance.username = validated_data.get('username', instance.username)
        instance.mobile = validated_data.get('mobile', instance.mobile)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.age = validated_data.get('age', instance.age)
        instance.blood_group = validated_data.get('blood_group', instance.blood_group)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance

        
class DoctorAvailabilitySerializer(serializers.Serializer):
    pass