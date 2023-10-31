from rest_framework import serializers



class RazorpayTransactionSerializer(serializers.Serializer):
    payment_id = serializers.CharField()
    order_id = serializers.CharField()
    signature = serializers.CharField()
    amount = serializers.IntegerField()
    