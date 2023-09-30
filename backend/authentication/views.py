# From libraries
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from rest_framework_simplejwt.tokens import Token, RefreshToken
from django.views.decorators.csrf import csrf_exempt

# From files
from .import views
from .models import Account
from .serializers import (
    AccountSerializer,
    AllAccountSerializer,
    LoginSerializer,
    UserActivationSerializer,
)

# Error logging
import logging
logger = logging.getLogger(__name__)



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
    print(serializer)
    print(serializer.is_valid())
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
    print(serializer.errors)

    for field, errors in serializer.errors.items():
        for error in errors:
            if 'unique' in error.code:
                return Response({'error': 'Account with this email already exists.'}, status=status.HTTP_409_CONFLICT)

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
    logger.debug("This is a debug message")
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

            # Generate access token with the correct lifetime
            access_token = RefreshToken.for_user(user)
            access_token.access_token.set_exp(lifetime=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'])

            # Generate refresh token with the correct lifetime
            refresh_token = RefreshToken.for_user(user)
            refresh_token.set_exp(lifetime=settings.SIMPLE_JWT['SLIDING_TOKEN_REFRESH_LIFETIME'])


            # Determine user roles
            roles = {
                'is_patient': user.is_patient,
                'is_doctor': user.is_doctor,
                'is_executive': user.is_executive,
                'is_lab': user.is_lab,
            }
            return Response({
                'accessToken': str(access_token.access_token),
                'refreshToken': str(refresh_token),
                'roles': roles,
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'You are not authorized to log in as a patient'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# Executive Login
@api_view(['POST'])
def executive_login(request):
    serializer = LoginSerializer(data=request.data)
    if not serializer.is_valid():
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

@csrf_exempt
@api_view(['POST'])
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
# Activate users
@api_view(['PATCH'])
def activate_user(request):
    # Check whether this request is coming from an executive or not
    # if not request.user.is_exective: 
    #     return Response({"detail": "You are not authorized to do this operation"}, status=403)

    # Second if the status to be updated is a superuser: 400. Else: proceed
    serializer = UserActivationSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.erros, status=400)
    
    user_id = serializer.validated_data['id']
    is_active = serializer.validated_data['is_active']
    
    try:
        account = Account.objects.get(id = user_id)
    except Account.DoesNotExist:
        return Response({"detail": "User with this ID does not exist."}, status=400)

    if account.is_superuser:
        return Response({"detail": "Cannot update a Superuser account"}, status=400)
     
    account.is_active = is_active
    account.save()

    return Response({"detail": "User account updated successfully"}, status=200)

