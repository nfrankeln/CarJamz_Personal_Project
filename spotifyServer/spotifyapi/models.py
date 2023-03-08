from django.db import models
from authorization.models import AppUser 
# Create your models here.
class SpotifyToken(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    refresh_token = models.TextField()
    access_token = models.TextField()
    token_type = models.CharField(max_length=50)