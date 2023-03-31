from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from authorization.models import AppUser
from spotifyapi.models import UserPlaylistCollection, Playlist,Genre
from django.db.models import Count
from django.core import serializers
from scipy.stats import pearsonr
import numpy as np
from django.db.models import Sum
from carjamz.utils import get_n_items
# Create your views here.
@api_view(['GET'])
def getuser(request):
    email = request.GET.get('email')
    user = AppUser.objects.filter(email=email).first()
    

    if user:
        playlist_collection = UserPlaylistCollection.objects.get(user=user)
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
@api_view(['GET'])
def common_intrests(request):
    # get querystring of ids
    ids=dict(request.GET)['ids[]']
    # convert all strings to numbers
    ids = list(map(int,ids))
    # append the App user
    print('my pk')
    ids.append(request.user.pk)
    # filter out duplicates
    ids=list(set(ids))
    print("user_ids",ids)
    users = AppUser.objects.filter(id__in=ids)
    playlistCollections=UserPlaylistCollection.objects.filter(user__in=users)
    topSongsPlaylists=Playlist.objects.filter(name='top songs', user_playlist_collection_id__in=playlistCollections)
    counters=[]
    for playlist in topSongsPlaylists:
        print(playlist)
        usersCount=Genre.objects.filter(artist__song__playlist = playlist).values('name').annotate(Count('name')).order_by('-name__count')
        counters.append(list(usersCount))
    print(len(counters))


# get the genre counts for each user
    # user_genres = [
    # Genre.objects.filter(artist__song__playlist__user=user_id).values_list('name', 'name__count').annotate(total=Sum('name__count'))
    # for user_id in ids]
# print the genre counters for each user
  

# create a list of all genres
    all_genres = list(set([g['name'] for user in counters for g in user]))
    print(len(all_genres))

# # create a matrix of genre counts for each user
    matrix = np.zeros((len(all_genres), len(counters)))
    
    for i, genre in enumerate(all_genres):
        
        for j, user in enumerate(counters):
            
            count = [g['name__count'] for g in user if g['name'] == genre]

            matrix[i,j] = count[0] if count else 0
    print(matrix)
    results=[]
    for index,row in enumerate(matrix):
        nonzeros = 0
        for element in row:
            if element != 0:
                nonzeros+=1
        print("genre",all_genres[index])
        print('row',row)
        print("nonzerose",nonzeros)
        print("power",10**nonzeros)
        print('len',len(row))
        print('sum',sum(row))
        print('avg',sum(row)/len(row))
        print("avg*power",sum(row)/len(row)*(10**nonzeros))
        row = (index,sum(row)/len(row)*(10**nonzeros))
        results.append(row)
    print(results)
    sorted_list = sorted(results, key=lambda x: x[1], reverse=True )

# return first 10 items or whole list
    top_ten_genres=[]
    first_ten=get_n_items(sorted_list,10)
    for item in first_ten:
        top_ten_genres.append(all_genres[item[0]])
    print(top_ten_genres)
    return JsonResponse({'topGenres':top_ten_genres})