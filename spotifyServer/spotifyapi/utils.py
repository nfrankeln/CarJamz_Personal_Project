from spotifyapi.models import SpotifyToken
from django.utils import timezone
from requests import post
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