
from .models import Car, RentalListing, SaleListing
# Create your views here.

from rest_framework import views, status
from rest_framework.response import Response
from .models import RentalListing
from .serializers import CarSerializer, RentalListingSerializer, SaleListingSerializer


# @GET(/cars/rentals)
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


# @GET(/cars/forsale)
class CarSaleListView(views.APIView):
    def get(self, request):
        sales = SaleListing.objects.all()
        serialized_data = []

        for sale in sales:
            sale_data = SaleListingSerializer(sale).data
            car_data = CarSerializer(sale.car_id).data

            combined_data = {
                "salelisting_id": sale_data.get("id"),
                "sale_price": sale_data.get("sale_price"),
                "listing_date":sale_data.get("listing_date"),
                "vehicle_id": car_data.get("car_id"),
                "brand": car_data.get("brand"),
                "model": car_data.get("model"),
                "colour": car_data.get("colour"),
                "vehicle_type": car_data.get("vehicle_type"),
                "vehicle_image": car_data.get("vehicle_image"),
                "seat_capacity": car_data.get("seat_capacity"),
                "no_of_owners": car_data.get("no_of_owners"),
                "engine_cap": car_data.get("engine_cap"),
                "registration_date": car_data.get("registration_date"),
                "coe_expiry": car_data.get("coe_expiry"),
                "depreciation": car_data.get("depreciation"),
                "mileage": car_data.get("mileage"),
                "road_tax_amount": car_data.get("road_tax_amount"),
                "fuel_consumption": car_data.get("fuel_consumption"),
                "transmission": car_data.get("transmission"),
            }

            serialized_data.append(combined_data)

        return Response(serialized_data, status=status.HTTP_200_OK)

