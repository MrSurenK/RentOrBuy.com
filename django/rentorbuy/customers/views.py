from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomerAccount, Rental
from .serializers import CustomerAccountSerializer, RentalSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


class JwtDetails(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        response = JWTAuthentication().authenticate(request)
        if response is not None:
            account, token = response

            print(account)
            print(account.id)
            print(account.email)

            return Response(token.payload)

        else:
            return Response('token error')

class CreateCustomerAccount(APIView):

    def post(self, request):
        nric = request.data.get('nric', None)
        email = request.data.get('email', None)

        if not nric or not email:
            return Response({'error': 'Both nric and email fields must be provided.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if a user with the given 'nric' already exists
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            customer = None

        if customer:
            # If customer exists and is inactive, activate the account
            if not customer.is_active:
                customer.is_active = True
                customer.save()
                return Response({'message': 'Account reactivated'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Account with this nric or email already exists.'},
                                status=status.HTTP_400_BAD_REQUEST)

        serializer = CustomerAccountSerializer(data=request.data)

        if serializer.is_valid():
            user = CustomerAccount.objects.create_user(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCustomerAccount(APIView):
    def patch(self, request, nric):
        try:
            customer = CustomerAccount.objects.get(nric=nric) #nric is the param
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Check if only 'is_active' field is present in the request data
        if set(request.data.keys()) == {'is_active'}:
            serializer = CustomerAccountSerializer(customer, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Only the is_active field can be updated.'}, status=status.HTTP_400_BAD_REQUEST)

class GetCustomerAccount(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        nric = request.data.get("nric", None)
        if nric is None:
            return Response({"error": "NRIC is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerAccountSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CustomerRentalHistory(APIView):
    def post(self, request):
        nric = request.data.get("nric", None)
        if nric is None:
            return Response({"error": "NRIC is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        rentals = Rental.objects.filter(customer_nric=customer)
        serializer = RentalSerializer(rentals, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)









