# Import Django Built-ins
from django.db import IntegrityError
from django.shortcuts import render,redirect
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
# Import Libraries
from rest_framework.decorators import api_view
from requests import Request,post
import requests
import asyncio
import aiohttp
import time
# Import Functions
from spotifyapi.utils import get_token, save_spotify_profile, get_top_tracks,get_artist,get_artists,get_artist_data_concurrently
# Import enviroment variables
from .credentials import CLIENT_ID,CLIENT_SECRET,REDIRECT_URI
# Import Models
from spotifyapi.models import SpotifyToken,Song,Playlist,UserPlaylistCollection,Artist,Genre
from authorization.models import AppUser
from django.db.models import Count


@api_view(['GET'])
def spotify_url(request):

        scopes= """ugc-image-upload
        user-read-playback-state
        user-modify-playback-state
        user-read-currently-playing
        app-remote-control
        playlist-read-private
        playlist-read-collaborative
        playlist-modify-private
        playlist-modify-public
        user-follow-modify
        user-follow-read
        user-read-playback-position
        user-top-read
        user-read-recently-played
        user-library-modify
        user-library-read
        user-read-email
        user-read-private
        streaming
        """
        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'show_dialog':True
        }).prepare().url
        
        return JsonResponse({'url': url})

def spotfiy_callback(request):
        
        code = request.GET.get('code')
        response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET}).json()

        access_token = response.get('access_token')
        token_type = response.get('token_type')
        refresh_token = response.get('refresh_token')
        expires_in = response.get('expires_in')
        error = response.get('error')
        
        newToken,created= SpotifyToken.objects.get_or_create(
                user = request.user,
                refresh_token = refresh_token,
                access_token = access_token,
                access_token_expiration=timezone.now() + timezone.timedelta(seconds=expires_in),
                token_type = token_type)
        if created:
                newToken.save()
        save_User_Spotify_Data(request)
        return redirect('authorization:home')
        pass
@api_view(['GET'])
# proxy api call for front end top song
def topSongs(request):
        userAcessToken=get_token(request.user)
        params={"limit":10}
        headers = {"Authorization": "Bearer "+ userAcessToken}
        try:
                response = requests.get("https://api.spotify.com/v1/me/top/tracks",params=params, headers=headers)
                response=response.json()
                return JsonResponse(response, safe=False)
        except Exception as e:
                print(e)
                return HttpResponse("error")
     
def save_User_Spotify_Data(request):
        start_time = time.time()
        
       
    
# STEP 1 GET USER'S Profile and Top Songs 
        user = AppUser.objects.get(email=request.user)
        access_token = get_token(user)
        headers = {"Authorization": "Bearer "+ access_token}
        
        save_spotify_profile(user,access_token)
       
        top_tracks=get_top_tracks(50,access_token)
        
# STEP 2 Create or Get a the users Collection of playlists
        user_playlist_collection, created = UserPlaylistCollection.objects.get_or_create(user=request.user)
        if not created:
                user_playlist_collection.save()      
#STEP 3 Get the users "top songs" playlist TODO 
# figure out better name could cause issue if user creates an actuall playlist called top songs 
#  possible solution change name to type such that type would be 
        playlist, created = Playlist.objects.get_or_create(
                name = "top songs",
                user_playlist_collection_id = user_playlist_collection)

      
# Loop through songs if song is created, the artist and genre are already saved!
# TODO make ascycio and clean up code

        # Use batch create to create songs
        songs=[]
        
        artist_tuples=[]
        for song in top_tracks:
                
                
                
                song_instance, created = Song.objects.get_or_create(name=song['name'], spotify_id=song['id'])
                songs.append(song_instance)
                if created:
                        artists_instances=[]
                        for artist in song['artists']:
                                id=artist['id']
                                artist_instance , created = Artist.objects.get_or_create(
                                name = artist['name'],
                                spotify_id = artist['id'])
                                artists_instances.append(artist_instance)         
                                if created:
                                       
                                       artist_tuples.append((artist_instance,f'https://api.spotify.com/v1/artists/{id}')) 
                        song_instance.artist.set(artists_instances)

        artist_urls=[artist[1] for artist in artist_tuples]
        artist_data=asyncio.run(get_artist_data_concurrently(artist_urls,headers))

        for index,artist in enumerate(artist_data):
                artistInstance = artist_tuples[index][0]
                for genre in artist['genres']:
                        new_genre,created=Genre.objects.get_or_create(name=genre)
                        artistInstance.genre.add(new_genre)
        playlist.songs.set(songs)

        return HttpResponse("test")
        pass
        





@api_view(['GET'])
def profileData(request):
        
        playlist_collection = UserPlaylistCollection.objects.get(user=request.user)
        top_songs_playlist = Playlist.objects.filter(name='top songs', user_playlist_collection_id=playlist_collection).first()
        top_five_genre = Genre.objects.filter(artist__song__playlist = top_songs_playlist).annotate(num_songs=Count('artist__song__playlist__id')).order_by('-num_songs')[:5]
        return JsonResponse({'top genres': top_five_genre})
        pass

@api_view(['POST'])
def create_spotify_playlist(request):
        data=request.data
        playlist_name=data['playlistName']
        uris = data['uris']
        # print(uris,playlist_name)
        user = AppUser.objects.get(email=request.user)
        token = get_token(user=request.user)
        user.spotifyID
        # GET USER SPOTIFY ID from DB or API
        headers = {"Authorization": "Bearer "+ token}
        response=requests.get('https://api.spotify.com/v1/me', headers = headers).json()
        user.spotifyID = response['id']
        user.save()
        # Create a playlist for that user
        response=requests.post(f'https://api.spotify.com/v1/users/{user.spotifyID}/playlists', json={"name":playlist_name}, headers=headers).json()
        playlist_id = response['id']
        # 
        response=requests.post(f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks', json={'uris':uris}, headers=headers)
        
        playlist_url=f'https://open.spotify.com/playlist/{playlist_id}'
        
        return JsonResponse({'url':playlist_url})
        

       
     
             



