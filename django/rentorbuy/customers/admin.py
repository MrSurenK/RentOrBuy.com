from django.contrib import admin
from .models import CustomerAccount, Rental, Complaint, CarSale, Fine
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

# Register your models here.

# admin.ModelAdmin
class CustomerAccountAdmin(UserAdmin):
    list_display = [ field.name for field in CustomerAccount._meta.fields if field.name != 'password']
    fieldsets = (
        ('Mandatory Information', {'fields': ('email', 'password', 'first_name', 'last_name', 'nric', 'age', 'contact_no', 'address',)}),
        ('Additional Info', {'fields': ('profile_pic',)}),
    )

    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "nric", "password1", "password2",'first_name', 'last_name', 'age', 'contact_no', 'address',],
            },
        ),
    ]


    filter_horizontal = []
    ordering = ('nric',)
    list_filter = ('is_staff', 'is_superuser', 'is_active',)


admin.site.register(CustomerAccount, CustomerAccountAdmin)
admin.site.unregister(Group)
admin.site.register(Rental)
admin.site.register(Complaint)
admin.site.register(CarSale)
admin.site.register(Fine)

