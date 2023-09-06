from django.urls import path
from .views import CreateCustomerAccount

urlpatterns = [
    path('register/', CreateCustomerAccount.as_view(), name='car-rental-list'),
    path('delete/',)
    # ... your other URL patterns ...
]
