from rest_framework import serializers
from .models import CustomerAccount, Rental, CarSale, Complaint, Fine, Insurance
from dealer.serializers import CarSerializer


class CustomerAccountSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(use_url=True)
    class Meta:
        model = CustomerAccount
        fields = '__all__'


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

