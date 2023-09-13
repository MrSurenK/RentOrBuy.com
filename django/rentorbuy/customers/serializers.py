from rest_framework import serializers
from .models import CustomerAccount, Rental, CarSale, Complaint, Fine, Insurance
from dealer.serializers import CarSerializer


class CustomerAccountSerializer(serializers.ModelSerializer):
    # profile_pic = serializers.ImageField(use_url=True)
    # class Meta:
    #     model = CustomerAccount
    #     fields = '__all__'
    class Meta:
        model = CustomerAccount
        fields = ['nric', 'first_name', 'last_name', 'profile_pic', 'age', 'email', 'contact_no', 'address', 'valid_license','is_active', 'password']
        extra_kwargs = {
            'profile_pic': {'required': False, 'allow_null': True, 'default': 'profile_pics/default.jpg'},
        }


class RentalWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = '__all__'

class RentalReadSerializer(serializers.ModelSerializer):
    car_id = CarSerializer()
    class Meta:
        model = Rental
        fields = '__all__'

class CarSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarSale
        fields = '__all__'

class CarSaleDisplaySerializer(serializers.ModelSerializer):
    car_id = CarSerializer()
    class Meta:
        model = CarSale
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

class FineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fine
        fields = '__all__'

