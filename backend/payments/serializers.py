from rest_framework import serializers



class RazorpayTransactionSerializer(serializers.Serializer):
    payment_id = serializers.CharField()
    order_id = serializers.CharField()
    signature = serializers.CharField()
    amount = serializers.IntegerField()

class RazorpayOrderSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    currency = serializers.CharField()
    doctor_email = serializers.CharField()
    date = serializers.CharField()
    line = serializers.CharField()
    time_slot = serializers.CharField()
