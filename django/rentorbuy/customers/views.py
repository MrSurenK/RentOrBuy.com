from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomerAccount
from .serializers import CustomerAccountSerializer

# Create your views here.
class CreateCustomerAccount(APIView):
    def put(self, request):
        serializer = CustomerAccountSerializer(data=request.data)

        if serializer.is_valid():
            print(serializer.data)
            user = CustomerAccount.objects.create_user(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
