from spotifyapi.models import SpotifyToken

def get_token(user):
    token=SpotifyToken.objects.get(user=user)
    return token.access_token