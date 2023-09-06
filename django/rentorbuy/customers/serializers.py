from rest_framework import serializers
from .models import CustomerAccount, Rental, CarSale, Complaint, Fine, Insurance


class CustomerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAccount
        fields = '__all__'

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = '__all__'

class CarSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarSale
        fields = '__all__'

class ComplaintSerializer(serializers.ModelSerializer):
    class Meta;:
        model = Complaint
        fields = '__all__'

class FineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fine
        fields = '__all__'

