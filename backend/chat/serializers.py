from rest_framework import serializers
from .models import ChatMessage


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'sender', 'reciever', 'message', 'is_read', 'date']