from django.contrib import admin
from .models import Car, Discount, RentalListing, SaleListing

# Register your models here.
admin.site.register(Car)
admin.site.register(Discount)
admin.site.register(RentalListing)
admin.site.register(SaleListing)
