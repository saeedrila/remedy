from rest_framework.views import APIView
from authentication.models import Account
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .serializers import (
    AccountApprovalSerializer,
    AccountApprovalPatchSerializer,
)
from appointments.models import Appointments


class AccountApproval(APIView):
    def get(self, request):
        account = Account.objects.filter(Q(is_doctor=True) | Q(is_lab=True) | Q(is_executive=True)).order_by('-id')
        serializer = AccountApprovalSerializer(account, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        if not request.user.is_executive:
            return Response({"detail": "You are not authorized to do this operation"}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = AccountApprovalPatchSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
        
        id = serializer.validated_data['id']
        activation_status = serializer.validated_data['status']

        try:
            account = Account.objects.get(id = id)
            account.is_active = activation_status
            account.save()

            action = 'approved' if activation_status else 'blocked'
            success_message = f"{account.email}'s account {action} successfully"
            response_data = {
                "detail": success_message,
                "email": account.email,
                "activation_status": activation_status,
            }
            if not activation_status:
                Appointments.objects.filter(doctor=account, status='Booked').update(status='Refused')

            return Response(response_data, status=status.HTTP_200_OK)
        
        except Account.DoesNotExist:
            return Response({"detail": "User with this ID does not exist."}, status=status.HTTP_401_UNAUTHORIZED)
        
        