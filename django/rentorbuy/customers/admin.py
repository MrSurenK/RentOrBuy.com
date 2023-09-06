from django.contrib import admin
from .models import CustomerAccount, Rental, Complaint, CarSale, Fine

# Register your models here.


class CustomerAccountAdmin(admin.ModelAdmin):
    list_display = [ field.name for field in CustomerAccount._meta.fields if field.name != 'password']
    fieldsets = (
        ('Mandatory Information', {'fields': ('email', 'password', 'first_name', 'last_name', 'nric', 'age', 'contact_no', 'address',)}),
        ('Additional Info', {'fields': ('profile_pic',)}),
    )


admin.site.register(CustomerAccount, CustomerAccountAdmin)
admin.site.register(Rental)
admin.site.register(Complaint)
admin.site.register(CarSale)
admin.site.register(Fine)

