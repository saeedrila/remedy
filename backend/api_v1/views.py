from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import Account
from .serializers import AccountSerializer
from rest_framework import status


@api_view(['GET'])
def get_data(request):
    account = Account.objects.all()
    serializer = AccountSerializer(account, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_account(request):
    if request.method == 'POST':
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data.get('password')

            if not password:
                return Response({'password': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
            
            account_manager = Account.objects
            user = account_manager.create_user(email = email, password = password)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
