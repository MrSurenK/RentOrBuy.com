from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from dealer.models import Car
from django.core.validators import RegexValidator
import uuid


# Create your models here


# Create Customer Account and Table
class CustomUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, age, contact_no, address, nric, password=None):
        if not email:
            raise ValueError('The Email Field must be set')
        if age is None or not first_name or not last_name or not contact_no or not address or not nric:  # All these fields are mandatory and age should not be 0
            raise ValueError('All fields must be set')

        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            age=age,
            contact_no=contact_no,
            address=address,
            nric=nric,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


nric_validator = RegexValidator(
    regex='^[STFGstfg]\d{7}[a-zA-Z]$',
    # https://stackoverflow.com/questions/29743154/regular-expression-for-nric-fin-in-singapore
    message='NRIC must be in the format: ^[STFGstfg]\d{7}[a-zA-Z]$',
    code='invalid_nric'
)

sg_num_validator = RegexValidator(
    regex=r'^\+65 \d{8}$',
    message='Contact number must be in the format: +65 12345678',
    code='invalid_contact_number'
)


class CustomerAccount(AbstractBaseUser):
    nric = models.CharField(max_length=9, unique=True, primary_key=True, validators=[nric_validator])
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True,
                                    default='profile_pics/default.jpg')
    age = models.SmallIntegerField()
    email = models.EmailField(unique=True)
    contact_no = models.CharField(max_length=12, validators=[sg_num_validator])
    address = models.CharField(max_length=255)
    valid_license = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    account_creation_date = models.DateTimeField(auto_now_add=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return f'{self.nric}, {self.email}, {self.first_name}'


# Rental Transcations model
class Rental(models.Model):
    class Status(models.TextChoices):
        NOT_COLLECTED = 'NC', 'Not collected'
        COLLECTED = 'CO', 'Collected',
        RETURNED = 'RE', 'Returned',
        OVERDUE = 'OD', 'Over Due'

    transaction_id = models.CharField(max_length=40, primary_key=True, editable=False,
                                      unique=True)  # Char40) beacuse UUID itslef is 36 characters and together with TRA- it will be 40
    # One to many rls is implied by Django with foreign key so no need to specify
    customer_nric = models.ForeignKey(CustomerAccount, on_delete=models.SET_NULL, null=True,
                                      related_name='rental_receipts')  # related name allows us to fetch all rental receipts of customer
    rental_price = models.DecimalField(max_digits=6,
                                       decimal_places=2)  # Have to create car fleet table and specify car rental rate
    transaction_amount = models.DecimalField(max_digits=6, decimal_places=2)
    early_termination = models.BooleanField(default=False)
    refunds = models.IntegerField(null=True, blank=True)
    transaction_date = models.DateTimeField(auto_now_add=True)
    rental_start_date = models.DateTimeField()
    rental_end_date = models.DateTimeField()
    rental_status = models.CharField(max_length=2, choices=Status.choices)

    # When you create a new Rentals object and call its save method, this custom implementation will execute.
    # If transaction_id has not been set, it will generate a new, unique ID, prefix it with "TRA-", and assign it to self.transaction_id.
    # It will then proceed to save the object to the database, including the newly generated transaction_id.

    def save(self, *args, **kwargs):
        if not self.transaction_id:
            self.transaction_id = f'TRA-{uuid.uuid4()}'
        # self.rental_price = self.cars.rental_rate  # Ensure the rental price matches the rental rate of the car

        # You call save() on a Rentals object.
        # The save method in Rentals checks if transaction_id is already set. If not, it sets it.
        # super(Rentals, self).save(*args, **kwargs) is called to actually save the object to the database, using Django's built-in functionality.
        super(Rental, self).save(*args, **kwargs)

# Sales Booking Table
class CarSale(models.Model):
    sale_id = models.CharField(max_length=41, primary_key=True, editable=False)
    customer_nric = models.ForeignKey(CustomerAccount, on_delete=models.SET_NULL, null=True, related_name='sales_booking')
    car_id = models.ForeignKey(Car, on_delete=models.DO_NOTHING, null=True)
    viewing_date = models.DateField()
    viewing_time = models.TimeField()
    is_sold = models.BooleanField(default=False)
    transaction_amount = models.DecimalField(max_digits=6, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    cancel_apt = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.sale_id:
            self.sale_id = f'SELL-{uuid.uuid4()}'
        super(CarSale, self).save(*args, **kwargs)


# Customer complaints
class Complaint(models.Model):
    class Outcome(models.TextChoices):
        PENDING = 'PEN', 'Pending'
        RESOLVED = 'RES', 'Resolved'
        UNRESOLVED = 'UR', 'Unresolved'

    complaint_id = models.CharField(max_length=40, primary_key=True, unique=True, editable=False)
    customer_nric = models.ForeignKey(CustomerAccount, on_delete=models.SET_NULL, null=True, related_name='customer_complaints')
    complaint_outcome = models.CharField(max_length=3, choices=Outcome.choices)
    complaint_description = models.TextField()
    date_log = models.DateTimeField(null=True, auto_now_add=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.complaint_id:
            self.complaint_id = f'COM-{uuid.uuid4()}'
        super(Complaint, self).save(*args, **kwargs)












