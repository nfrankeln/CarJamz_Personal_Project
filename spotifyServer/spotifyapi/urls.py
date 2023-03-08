from . import views
from django.urls import path

urlpatterns = [
    path('api/spotify/authorize/', views.spotify_url),
    path('api/spotify/callback/', views.spotfiy_callback),
]
