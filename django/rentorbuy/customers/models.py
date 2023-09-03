from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator



# Create your models here.


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
    regex='^[STFGstfg]\d{7}[a-zA-Z]$', # https://stackoverflow.com/questions/29743154/regular-expression-for-nric-fin-in-singapore
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
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True, default='profile_pics/default.jpg')
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



































