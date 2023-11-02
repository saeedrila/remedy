from rest_framework.views import APIView
from .pusher import pusher_client
from rest_framework.response import Response



class ChatAPIView(APIView):
    def post(self, request):
        pusher_client.trigger('chat', 'message', {
            'email': request.data['email'],
            'message': request.data['message'],
        })

        return Response(['Message recieved'])
