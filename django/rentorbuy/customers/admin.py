from django.contrib import admin
from .models import CustomerAccount, Rental, Complaint

# Register your models here.


class CustomerAccountAdmin(admin.ModelAdmin):
    exclude = ('last_login', 'valid_license', 'is_active')
    fieldsets = (
        ('Mandatory Information', {'fields': ('email', 'password', 'first_name', 'last_name', 'nric', 'age', 'contact_no', 'address',)}),
        ('Additional Info', {'fields': ('profile_pic',)}),
    )


admin.site.register(CustomerAccount, CustomerAccountAdmin)
admin.site.register(Rental)
admin.site.register(Complaint)

