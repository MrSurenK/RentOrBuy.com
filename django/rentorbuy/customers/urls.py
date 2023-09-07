from django.urls import path
from .views import CreateCustomerAccount, DeleteCustomerAccount, GetCustomerAccount, CustomerRentalHistory, CustomerSaleHistory, EditSaleAppointment, CreateRental, CreateCarSale

urlpatterns = [
    path('register/', CreateCustomerAccount.as_view(), name='create-customer-account'),
    path('delete/', DeleteCustomerAccount.as_view(), name='delete-customer-account'),
    path('details/', GetCustomerAccount.as_view(), name='get-customer-account'),
    path('cars/rentals/', CustomerRentalHistory.as_view(), name='customer-rentals'),
    path('cars/sales/', CustomerSaleHistory.as_view(), name='customer-sales'),
    path('cars/sale/<str:sale_id>/', EditSaleAppointment.as_view(), name='edit-sale-apt'),
    path('rental', CreateRental.as_view(), name='create-new-rental-transaction'),
    path('carSale', CreateCarSale.as_view(), name='create-car-sale')
    # ... your other URL patterns ...
]

