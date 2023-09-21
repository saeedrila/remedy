from rest_framework.response import Response
from rest_framework.decorators import api_view
from authentication.models import Account
from .serializers import AccountSerializer, AllAccountSerializer, LoginSerializer
from rest_framework import status
from django.contrib.auth import authenticate, login, logout


# Generic show all user accounts should be deleted before deploying
@api_view(['GET'])
def get_data(request):
    account = Account.objects.all().order_by('-id')
    serializer = AllAccountSerializer(account, many=True)
    return Response(serializer.data)

# Sign up
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
def patient_signup(request):
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
def doctor_signup(request):
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
def lab_signup(request):
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

# Executive signup
@api_view(['POST'])
def executive_signup(request):
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

# Login
# Patinet Login
@api_view(['POST'])
def patient_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_patient:
            login(request, user)
            return Response({'message': 'Patient login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a patient'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Executive Login
@api_view(['POST'])
def executive_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_executive:
            login(request, user)
            return Response({'message': 'Executive login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as an executive'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Doctor Login
@api_view(['POST'])
def doctor_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_doctor:
            login(request, user)
            return Response({'message': 'Doctor login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a doctor'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# Lab Login
@api_view(['POST'])
def lab_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
        print("Invalid serializer data:", serializer.errors)
        return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    password = serializer.validated_data.get('password')
    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_ls:
            login(request, user)
            return Response({'message': 'Lab login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a lab'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def logout(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)