# models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=100, unique=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    cv = models.FileField(upload_to='cvs/', validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
