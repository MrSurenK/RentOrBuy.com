from django.db import models
from django.core.validators import RegexValidator, MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
import uuid


license_plate_validator = RegexValidator(
    regex=r'^S[A-Z]{2}[0-9]{1,4}[A-Z]$', #Regex for singapore license plates
    message='Please enter a valid Singapore registered license plate', # message when validation fails
    code='invalid_license_plate'
)

# Create your models here.
class Car(models.Model):
    class CarType(models.TextChoices):
        HATCHBACK = 'hatchback'
        SPORTS = 'sports', 'Sports car'
        SEDAN = 'sedan'
        MPV = 'mpv', 'family car'
    class Gearbox(models.TextChoices):
        AUTO = 'auto', 'automatic transmission'
        MANUAL = 'manual', 'manual transmission'
    car_id = models.CharField(max_length=40, primary_key=True, editable=False, unique=True)
    registration_no = models.CharField(max_length=9, unique=True, validators=[license_plate_validator])
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    brand = models.CharField(max_length=150)
    model = models.CharField(max_length=150)
    road_tax_expiry = models.DateField()
    coe_expiry = models.DateField()
    colour = models.CharField(max_length=20)
    seat_capacity = models.PositiveSmallIntegerField(validators=[MaxValueValidator(7), MinValueValidator(2)]) #Car can have a min of 2 seats and a max of 7 seats
    fuel_consumption = models.PositiveSmallIntegerField(validators=[MinValueValidator(1)])
    transmission = models.CharField(max_length=6, choices=Gearbox.choices)
    no_of_owners = models.PositiveSmallIntegerField()
    vehicle_type = models.CharField(max_length=10, choices=CarType.choices)
    engine_cap = models.PositiveIntegerField()
    registration_date = models.DateField()
    depreciation = models.PositiveSmallIntegerField()
    mileage = models.PositiveIntegerField()
    road_tax_amount = models.PositiveSmallIntegerField()
    is_avail = models.BooleanField(default=True)
    vehicle_image = models.ImageField(upload_to='car_pics', null=True, blank=True)

    # Validation runs even when updates are made to the table via save method. 'Clean method' requires it to be called specifically
    def save(self, *args, **kwargs):
        if not self.car_id:
            self.car_id = f'CAR-{uuid.uuid4()}'
        if self.vehicle_type == self.CarType.SPORTS and self.seat_capacity != 2:
            raise ValidationError('Sports cars must have a seat capacity of 2')
        elif self.vehicle_type == self.CarType.MPV and self.seat_capacity != 7:
            raise ValidationError('MPVs must have a seat capacity of 7')
        elif self.vehicle_type == (self.CarType.SEDAN or self.vehicle_type == self.CarType.HATCHBACK) and self.seat_capacity != 4:
            raise ValidationError('Sedans must have a seat capacity of 4')
        super(Car, self).save(*args, **kwargs)


class Discount(models.Model):
    id = models.AutoField(primary_key=True)
    sale_id = models.ForeignKey('customers.CarSale', on_delete=models.SET_NULL, null=True, related_name='discount_model')
    percentage = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True) # % of discount to be awareded if dealer chooses to do so
    amount = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True) # nominal discount value if dealer chooses to give any
    description = models.TextField()

# Rental and sale listing will be on delete cascade as if the car does not exist, the listing should not as well.
# However, as other tables depend on car id, by design car will not be deleted
# Rental listing will be able to delete as it is not referenced as a parent table anywhere
class RentalListing(models.Model):
    id = models.AutoField(primary_key=True)
    car_id = models.OneToOneField(Car, on_delete=models.CASCADE, related_name="rental_post")
    rental_rate = models.DecimalField(max_digits=6, decimal_places=2)
    listing_date = models.DateField(auto_now_add=True)
    drive_to_malaysia = models.BooleanField(default=True)

# Sale listing will be able to delete as it is not referenced as a parent table anywhere
class SaleListing(models.Model):
    id = models.AutoField(primary_key=True)
    car_id = models.OneToOneField(Car, on_delete=models.CASCADE, related_name="sale_post")
    sale_price = models.PositiveBigIntegerField()
    listing_date = models.DateField(auto_now_add=True)














