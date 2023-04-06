from . import views
from django.urls import path

urlpatterns = [
    path('api/spotify/authorize/', views.spotify_url),
    path('api/spotify/callback/', views.spotfiy_callback),
    path('api/spotify/top-songs/',views.topSongs),
    path('api/profileData/', views.profileData),
    path('api/spotify/playlists/create/',views.create_spotify_playlist),
]
