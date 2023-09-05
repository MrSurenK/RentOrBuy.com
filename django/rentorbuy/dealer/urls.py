from django.urls import path
from .views import CarRentalListView

urlpatterns = [
    path('cars/rentals/', CarRentalListView.as_view(), name='car-rental-list'),
    # ... your other URL patterns ...
]
