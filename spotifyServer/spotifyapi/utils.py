from spotifyapi.models import SpotifyToken
from django.utils import timezone
from requests import post
import requests
import asyncio
import aiohttp
from .credentials import CLIENT_ID,CLIENT_SECRET,REDIRECT_URI

# get token from database if the token has expired (UTC) refresh the token
def get_token(user):
    token=SpotifyToken.objects.get(user=user)
    if token.access_token_expiration > timezone.now():
        return token.access_token
    else:
        return refresh_access_token(token)
        
    # refreshe token, save new token and expiraiton time, and return new access token 
def refresh_access_token(token):
    try:
        response = post('https://accounts.spotify.com/api/token', data={
            'grant_type': 'refresh_token',
            'refresh_token': token.refresh_token,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }).json()

        access_token = response.get('access_token')
        expires_in = response.get('expires_in')

        token.access_token=access_token
        token.access_token_expiration= timezone.now() + timezone.timedelta(seconds=expires_in)
        token.save()
        return access_token
    except:
         return False
    

# currently only save there image but could be modified to save more
def save_spotify_profile(user,access_token):
        headers = {"Authorization": "Bearer "+ access_token}
        response=requests.get('https://api.spotify.com/v1/me', headers = headers).json()
        if 'images' in response and len(response['images']) > 0:
                user.profileImageUrl = response['images'][0]['url'] 
        else:
                user.profileImageUrl='https://i.ibb.co/Zgcdrfj/profile-image.png'
        user.save()

# returns a users top tracks as a json object for itereation
def get_top_tracks(amount,access_token):
      params={"limit":amount}
      headers = {"Authorization": "Bearer "+ access_token}
      response = requests.get("https://api.spotify.com/v1/me/top/tracks",params=params, headers=headers)
      response=response.json()
      return response['items']

async def get_artist(artist_id, headers):
    
    url = f'https://api.spotify.com/v1/artists/{artist_id}'
    artist_response = requests.get(url , headers=headers)
    return artist_response.json()

async def get_artists(artist_ids, headers):
    tasks = []
    for artist in artist_ids:
        task = asyncio.create_task(get_artist(artist, headers))
        tasks.append(task)
    artist_responses = await asyncio.gather(*tasks)
    return artist_responses

async def get_artist_data(session,url,headers):
        async with session.get(url,headers=headers) as response:
            result_data = await response.json()
            return result_data
        
async def get_artist_data_concurrently(urls,headers):
        async with aiohttp.ClientSession() as session:
            tasks=[]
            for url in urls:
                task=asyncio.ensure_future(get_artist_data(session,url,headers))
                tasks.append(task)
            responses= await asyncio.gather(*tasks)
            return responses

       