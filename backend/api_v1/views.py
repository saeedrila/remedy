from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import Account
from .serializers import AccountSerializer, AllAccountSerializer
from rest_framework import status


# Generic show all user accounts should be deleted before deploying
@api_view(['GET'])
def get_data(request):
    account = Account.objects.all().order_by('-id')
    serializer = AllAccountSerializer(account, many=True)
    return Response(serializer.data)

# Generic user account creation
@api_view(['POST'])
def add_account(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(email = email, password = password)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Patient signup
@api_view(['POST'])
def add_patient(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_patient = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_patient=is_patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Doctor signup
@api_view(['POST'])
def add_doctor(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_doctor = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_doctor=is_doctor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Lab signup
@api_view(['POST'])
def add_lab(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_lab = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_lab=is_lab)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Lab signup
@api_view(['POST'])
def add_executive(request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        is_executive = 'True'

        if not password:
            return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        account_manager = Account.objects
        user = account_manager.create_user(
            email = email,
            password = password,
            is_executive=is_executive)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)