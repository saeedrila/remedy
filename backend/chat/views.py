from rest_framework.views import APIView
from .pusher import pusher_client
from rest_framework.response import Response



class ChatAPI(APIView):
    def post(self, request):
        sender_email = request.data['senderEmail']
        recipient_email = request.data['recipientEmail']
        message_text = request.data['message']

        pusher_client.trigger('Remedy-development', 'message', {
            'email': sender_email,
            'message': message_text,
        })

        return Response(['Message recieved'])
