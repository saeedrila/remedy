# From libraries
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from rest_framework_simplejwt.tokens import Token, RefreshToken
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
import os

# From files
from .import views
from .models import Account
from .serializers import (
    AccountSerializer,
    AllAccountSerializer,
    LoginSerializer,
    UserActivationSerializer,
    ChangePasswordSerializer
)

# Error logging
import logging
logger = logging.getLogger(__name__)



# Generic show all user accounts should be deleted before deploying
class AllAccountListView(APIView):
    def get(self, request):
        account = Account.objects.all().order_by('-id')
        serializer = AllAccountSerializer(account, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Sign up
# Generic user account creation
class AddAccount(APIView):
    def post(self, request):
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

# Account signup
class AccountSignup(APIView):
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data.get('password')
            account_type = request.data.get('account_type')

            if not password:
                return Response({'Password field is required'}, status=status.HTTP_400_BAD_REQUEST)

            if account_type not in ('patient', 'doctor', 'lab', 'executive'):
                return Response({'error': 'Invalid account type'}, status=status.HTTP_400_BAD_REQUEST)

            account_manager = Account.objects
            user = account_manager.create_user(
                email = email,
                password = password,
                is_patient = account_type == 'patient',
                is_doctor = account_type == 'doctor',
                is_lab = account_type == 'lab',
                is_executive = account_type == 'executive'
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Account Login
class AccountLogin(APIView):
    def post(self, request):
        logger.info("Account Login initiated")
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            print("Invalid serializer data:", serializer.errors)
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data.get('password')
        user = authenticate(request, email=email, password=password)

        if user is not None:
            account = Account.objects.get(email = email)
            login(request, user)
            if not account.username:
                username = account.email
            else:
                username = account.username

            # Generate access token with the correct lifetime
            access_token = RefreshToken.for_user(user)
            access_token.access_token.set_exp(lifetime=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'])

            # Generate refresh token with the correct lifetime
            refresh_token = RefreshToken.for_user(user)
            refresh_token.set_exp(lifetime=settings.SIMPLE_JWT['SLIDING_TOKEN_REFRESH_LIFETIME'])

            aws_public_url = 'https://remedy-development.s3.ap-south-1.amazonaws.com'
            if account.profile_pic_url:
                file_name_within_bucket = account.profile_pic_url
            else: 
                file_name_within_bucket = 'media/profile_pic/avatar-1.png'

            profile_pic_url = os.path.join(
                aws_public_url,
                file_name_within_bucket
            )

            # Determine user roles
            roles = {
                'is_patient': user.is_patient,
                'is_doctor': user.is_doctor,
                'is_executive': user.is_executive,
                'is_lab': user.is_lab,
            }
            return Response({
                'message': 'Login successful',
                'accessToken': str(access_token.access_token),
                'refreshToken': str(refresh_token),
                'roles': roles,
                'username': username,
                'profilePicURL': profile_pic_url
            }, status=status.HTTP_200_OK)
        
        else:
            try:
                account = Account.objects.get(email = email)
                if not account.is_active:
                    return Response({'error': 'Your account has been blocked'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                pass
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)


# Activate users
class ActivateUser(APIView):
    def patch(self, request):
        if not request.user.is_exective: 
            return Response({"detail": "You are not authorized to do this operation"}, status=403)

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

class ChangePassword(APIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            current_password = serializer.validated_data['current_password']
            new_password = serializer.validated_data['new_password']

            user = request.user

            if not user.check_password(current_password):
                return Response({"detail": "Current Password incorrect"}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(new_password)
            user.save()
            return Response({"details": "Password changed Successfully"}, status=status.HTTP_202_ACCEPTED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)