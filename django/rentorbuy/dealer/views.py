from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Car, RentalListing, SaleListing
from .serializers import CarSerializer, RentalListingSerializer, SaleListingSerializer

# Create your views here.

from rest_framework import views, status
from rest_framework.response import Response
from .models import RentalListing
from .serializers import CarSerializer, RentalListingSerializer


class CarRentalListView(views.APIView):

    def get(self, request):
        rentals = RentalListing.objects.all()
        serialized_data = []

        for rental in rentals:
            rental_data = RentalListingSerializer(rental).data
            car_data = CarSerializer(rental.car_id).data

            combined_data = {
                "rentallisting_id": rental_data.get("id"),
                "rental_rate": rental_data.get("rental_rate"),
                "drive_to_malaysia": rental_data.get("drive_to_malaysia"),
                "listing_date": rental_data.get("listing_date"),
                "vehicle_id": car_data.get("car_id"),
                "brand": car_data.get("brand"),
                "model": car_data.get("model"),
                "colour": car_data.get("colour"),
                "vehicle_type": car_data.get("vehicle_type"),
                "vehicle_image": car_data.get("vehicle_image"),
                "seat_capacity": car_data.get("seat_capacity"),
            }

            serialized_data.append(combined_data)

        return Response(serialized_data, status=status.HTTP_200_OK)


