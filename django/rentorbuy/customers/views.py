from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CustomerAccount, Rental, CarSale
from .serializers import CustomerAccountSerializer, RentalReadSerializer, CarSaleSerializer, RentalWriteSerializer, CarSaleDisplaySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from django.db.models import Q


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

    parser_classes = [MultiPartParser, FormParser]

    def put(self, request):
        nric = request.data.get('nric', None)
        email = request.data.get('email', None)

        if not nric or not email:
            return Response({'error': 'Both nric and email fields must be provided.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            customer_by_nric = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            customer_by_nric = None

        try:
            customer_by_email = CustomerAccount.objects.get(email=email)
        except CustomerAccount.DoesNotExist:
            customer_by_email = None

        if customer_by_nric or customer_by_email:
            if customer_by_nric and not customer_by_nric.is_active:
                customer_by_nric.is_active = True
                customer_by_nric.save()
                return Response({'message': 'Account with this nric reactivated'}, status=status.HTTP_200_OK)
            elif customer_by_email and not customer_by_email.is_active:
                customer_by_email.is_active = True
                customer_by_email.save()
                return Response({'message': 'Account with this email reactivated'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Account with this nric or email already exists.'},
                                status=status.HTTP_400_BAD_REQUEST)

        serializer = CustomerAccountSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data
            if 'profile_pic' not in request.FILES:
                validated_data['profile_pic']='profile_pics/default.jpg'
            # validated_data['profile_pic'] = request.FILES.get('profile_pic', None)
            # If is_active is not in the request data, remove it from validated_data to use the default value from the model
            if 'is_active' and 'valid_license' not in request.data:
                validated_data.pop('is_active', None)
                validated_data.pop('valid_license', None)
            user = CustomerAccount.objects.create_user(**serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditCustomerAccount(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        print(request.user)

        nric = request.user.nric
        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        request_dict = request.data.dict()

        print(request_dict)

        data = {}

        if 'address' in request_dict and len(request_dict['address'].strip()) > 0:
            data['address'] = request_dict['address']
        #
        if 'contact_no' in request_dict and len(request_dict['contact_no'].strip()) > 0:
            data['contact_no'] = request_dict['contact_no']

        if 'email' in request_dict and len(request_dict['email'].strip()) > 0:
            data['email'] = request_dict['email']

        if 'profile_pic' in request.data:
            data['profile_pic'] = request.FILES.get('profile_pic', None)

        # data = {
        #     'address': request.data.get('address', customer.address),
        #     'contact_no': request.data.get('contact_no', customer.contact_no),
        #     'email': request.data.get('email', customer.email),
        #     'profile_pic': request.FILES.get('profile_pic', None),
        # }

        print(data)

        serializer = CustomerAccountSerializer(customer, data=data, partial=True)

        if serializer.is_valid():
            print(1)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteCustomerAccount(APIView):
    permission_classes = (IsAuthenticated,)
    def delete(self, request):
        nric = request.user.nric
        try:
            customer = CustomerAccount.objects.get(nric=nric)
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
    # authentication_classes = []  # disables authentication
    # permission_classes = []  # disables permission

    def post(self, request):
        nric = request.user.nric
        if nric is None:
            return Response({"error": "NRIC is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = CustomerAccountSerializer(customer, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerRentalHistory(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        nric = request.user.nric
        if nric is None:
            return Response({"error": "NRIC is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # access to all the car model items via .select_related('car_id')
        rentals = Rental.objects.filter(customer_nric=customer).select_related('car_id')
        serializer = RentalReadSerializer(rentals, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerSaleHistory(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        nric = request.user.nric
        if nric is None:
            return Response({"error": "NRIC is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            customer = CustomerAccount.objects.get(nric=nric)
        except CustomerAccount.DoesNotExist:
            return Response(status=status.HTTP_400_NOT_FOUND)

        sales = CarSale.objects.filter(customer_nric=customer)
        serializer = CarSaleDisplaySerializer(sales, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class EditSaleAppointment(APIView):
    permission_classes = (IsAuthenticated,)
    def patch(self, request, sale_id):
        nric = request.user.nric

        if not sale_id:
            return Response({'error': "sale id must be provided in the url"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            sale_apt = CarSale.objects.get(sale_id=sale_id, customer_nric=nric)
        except CarSale.DoesNotExist:
            return Response({'error': "Car sale not found or you're not authorized to edit this sale."}, status=status.HTTP_404_NOT_FOUND)
        # Validating and updating only the fields below
        serializer = CarSaleSerializer(sale_apt, data=request.data, partial=True)

        if serializer.is_valid():
            valid_fields = {'cancel_apt', 'viewing_date', 'viewing_time'}
            payload_fields = set(request.data.keys())

            # Remove 'sale_id' from payload fields as we've already used it
            payload_fields.discard('sale_id')

            if 'cancel_apt' in payload_fields and ('viewing_date' in payload_fields or 'viewing_time' in payload_fields):
                return Response({"error":"You can either cancel the appointment or change the viewing date and time but not both."}, status=status.HTTP_400_BAD_REQUEST)

            for field in payload_fields:
                if field not in valid_fields:
                    return Response({"error": f"Invalid field {field}. You can only update cancel_apt or viewing_date and viewing_time."}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateRental(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data.copy()
        print(data)
        data['customer_nric'] = request.user.nric  # Assuming that nric is a field in your JWT payload and mapped to request.user

        car_id = data.get('car_id')
        start_date = data.get('rental_start_date')
        end_date = data.get('rental_end_date')
        print(car_id)


        # Assuming car_id is in the request payload
        if 'car_id' not in data:
            return Response({"error": "car_id must be provided in payload."}, status=status.HTTP_400_BAD_REQUEST)
        if not start_date or not end_date:
            return Response({"error": "Both start_date and end_date must be provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Check for exisiting bookings that overlap with the requested data range
        # Check for rentals that overlap with the proposed start date. (Rental start date <= startdate and rental end date >= start date)
        # Check when rental period overlaps with proposed end date. (Rental start date <= end date and rental end date >= end date)
        # Check when rental are entirely encompassed within the proposed rental period. (Rental start date >= start date and rental end date <= end date)
        overlapping_bookings = Rental.objects.filter(
            Q(car_id=car_id) &  # Include the customer ID here
            (
                    Q(rental_start_date__lte=start_date, rental_end_date__gte=start_date) |
                    Q(rental_start_date__lte=end_date, rental_end_date__gte=end_date) |
                    Q(rental_start_date__gte=start_date, rental_end_date__lte=end_date)
            )
        )


        print(f"Car ID: {car_id}, Start Date: {start_date}, End Date: {end_date}")

        if overlapping_bookings.exists():
            return Response({"error": "The car is already booked on the requested dates."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RentalWriteSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateCarSale(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        nric = request.user.nric  # Assuming nric is present in JWT claims and mapped to request.user

        # Create a copy of the POST data to include customer_nric
        data = request.data.copy()
        data['customer_nric'] = nric

        # Use serializer to validate and save the object
        serializer = CarSaleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)