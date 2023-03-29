from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from authorization.models import AppUser
from spotifyapi.models import UserPlaylistCollection, Playlist,Genre
from django.db.models import Count
from django.core import serializers
# Create your views here.
@api_view(['GET'])
def getuser(request):
    email = request.GET.get('email')
    user = AppUser.objects.filter(email=email).first()
    

    if user:
        playlist_collection = UserPlaylistCollection.objects.get(user=request.user)
        top_songs_playlist = Playlist.objects.filter(name='top songs', user_playlist_collection_id=playlist_collection).first()
        top_five_genre = Genre.objects.filter(artist__song__playlist = top_songs_playlist).annotate(num_songs=Count('artist__song__playlist__id')).order_by('-num_songs')[:5].values_list('name', flat=True)
        print(top_five_genre)
        return JsonResponse({'found':True,
            'first_name':user.first_name,
                             'last_name':user.last_name,
                             'pk':user.pk,
                             'top_five_genre':list(top_five_genre)
                             }, safe=False)
    return JsonResponse({'found':False})