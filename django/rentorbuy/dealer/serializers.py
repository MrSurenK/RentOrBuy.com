from rest_framework import serializers
from .models import Car, RentalListing, SaleListing

class RentalListingSerializer(serializers, ModelSerializer):
    class Meta:
        model = RentalListing
        fields = '__all__'

class CarSerializer(serializers, ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class SaleListingSerializer(serializers, ModelSerializer):
    class Meta:
        model = SaleListing
        fields = '__all__'








