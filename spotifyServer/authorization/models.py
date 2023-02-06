from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import (AbstractUser)
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)
# Create your models here.


class AppUser(AbstractUser):
    """AppUser model - user account"""
    username=None
    email = models.EmailField(
        verbose_name='email address', # optional argument
        max_length=255,
        unique=True
    )
    imageURL=models.TextField(null=True)
    spotifyID=models.CharField(max_length=255,null=True,blank=True)
    
    objects=UserManager()

    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
                self.full_clean()
                return super().save(*args, **kwargs)

    # The `password` field is built in to AbstractUser

    # For Django, the `username` field is special for User models
    # It is what is used for login.
    # If we just want to use email for login, and not require a username,
    # We have to tell Django to treat the `email` field like the `username` field.
    USERNAME_FIELD = 'email' #IMPORTANT
    REQUIRED_FIELDS = [] # email and password are required by default