from django.urls import path
from .views import CreateCustomerAccount, DeleteCustomerAccount, GetCustomerAccount, CustomerRentalHistory

urlpatterns = [
    path('register/', CreateCustomerAccount.as_view(), name='create-customer-account'),
    path('delete/<str:nric>/', DeleteCustomerAccount.as_view(), name='delete-customer-account'),
    path('details/', GetCustomerAccount.as_view(), name='get-customer-account'),
    path('cars/rentals/', CustomerRentalHistory.as_view(), name='customer-rentals')
    # ... your other URL patterns ...
]
