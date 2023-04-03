from django.db import models
from authorization.models import AppUser 

# Token Model required to Make Spotify API calls tokens expire after 1hr
class SpotifyToken(models.Model):
    user = models.ForeignKey(AppUser, on_delete = models.CASCADE)
    refresh_token = models.TextField()
    access_token = models.TextField()
    access_token_expiration = models.DateTimeField()
    token_type = models.CharField(max_length = 50)
# Contains All of a users playlists
class UserPlaylistCollection(models.Model):
    user = models.ForeignKey(AppUser, on_delete = models.CASCADE)
# Contains genre 
class Genre(models.Model):
    name = models.CharField(max_length = 255)
# Contains spotify id for artists and their related genres
class Artist(models.Model):
    name = models.CharField(max_length = 255)
    spotify_id = models.CharField(max_length = 255)
    genre = models.ManyToManyField(Genre, blank = True )
# Contains Spotify id for songs and releated artists and through which one can query the song's genres
class Song(models.Model):
    name = models.CharField(max_length = 255)
    spotify_id = models.CharField(max_length = 255)
    artist = models.ManyToManyField(Artist, blank = True )
    
class Playlist(models.Model):
    name = models.CharField(max_length = 255) 
    user_playlist_collection_id= models.ForeignKey(UserPlaylistCollection, on_delete = models.CASCADE)
    songs = models.ManyToManyField(Song, blank = True)




    