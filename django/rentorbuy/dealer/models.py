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
    is_avail = models.BooleanField()

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

