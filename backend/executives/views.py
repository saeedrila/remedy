from rest_framework.views import APIView
from authentication.models import Account
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .serializers import (
    AccountActivationSerializer,
)


class AccountApproval(APIView):
    def get(self, request):
        account = Account.objects.filter(Q(is_doctor=True) | Q(is_lab=True) | Q(is_executive=True)).order_by('-id')
        serializer = AccountActivationSerializer(account, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
