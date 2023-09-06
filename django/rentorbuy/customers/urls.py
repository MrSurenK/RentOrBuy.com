from django.urls import path
from .views import CreateCustomerAccount, DeleteCustomerAccount, GetCustomerAccount, CustomerRentalHistory, CustomerSaleHistory, EditSaleAppointment

urlpatterns = [
    path('register/', CreateCustomerAccount.as_view(), name='create-customer-account'),
    path('delete/', DeleteCustomerAccount.as_view(), name='delete-customer-account'),
    path('details/', GetCustomerAccount.as_view(), name='get-customer-account'),
    path('cars/rentals/', CustomerRentalHistory.as_view(), name='customer-rentals'),
    path('cars/sales/', CustomerSaleHistory.as_view(), name='customer-sales'),
    path('cars/sale/<str:sale_id>/', EditSaleAppointment.as_view(), name='edit-sale-apt'),
    # ... your other URL patterns ...
]

