from django.urls import path
from .views import CarRentalListView, CarSaleListView

urlpatterns = [
    path('cars/rentals/', CarRentalListView.as_view(), name='car-rental-list'),
    path('cars/forsale', CarSaleListView.as_view(), name='car-sale-list'),
    # ... your other URL patterns ...
]
