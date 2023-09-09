from django.urls import path
from .views import CarRentalListView, CarSaleListView, TestRoute

urlpatterns = [
    path('cars/rentals', CarRentalListView.as_view(), name='car-rental-list'),
    path('cars/forsale', CarSaleListView.as_view(), name='car-sale-list'),
    path('cars/hi', TestRoute.as_view(), name="test"),
    # ... your other URL patterns ...
]


