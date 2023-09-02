from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
import uuid


# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('The Email Field must be set')

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using = self._db)
        return user


class CustomerAccount(AbstractBaseUser):
    nric = models.CharField(max_length=9, unique=True, primary_key=True), # More specific validation required
    name = models.CharField(),
    age = models.SmallIntegerField(),
    email = models.EmailField(unique=True)
    contact_no = models.IntegerField() # Rmb to validate
    address = models.CharField()
    valid_license = models.BooleanField(default=True)
    account_creation_date = models.DateTimeField(auto_now_add=True)



























