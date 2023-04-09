from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from authorization.models import AppUser
from spotifyapi.models import UserPlaylistCollection, Playlist,Genre,Artist
from django.db.models import Count
from django.core import serializers
from scipy.stats import pearsonr
import numpy as np
from django.db.models import Sum
import requests
import random
import math
from carjamz.utils import get_n_items
from spotifyapi.utils import get_token
# Create your views here.
@api_view(['GET'])
def getuser(request):
    email = request.GET.get('email')
    user = AppUser.objects.filter(email=email).first()
    

    if user:
        playlist_collection = UserPlaylistCollection.objects.get(user=user)
        top_songs_playlist = Playlist.objects.filter(name='top songs', user_playlist_collection_id=playlist_collection).first()
        top_five_genre = Genre.objects.filter(artist__song__playlist = top_songs_playlist).annotate(num_songs=Count('artist__song__playlist__id')).order_by('-num_songs')[:5].values_list('name', flat=True)
        return JsonResponse({'found':True,
            'first_name':user.first_name,
                             'last_name':user.last_name,
                             'pk':user.pk,
                             'top_five_genre':list(top_five_genre),
                             'profileImageUrl':user.profileImageUrl,
                             }, safe=False)
    return JsonResponse({'found':False})

@api_view(['GET'])
def common_intrests(request):
    # get querystring of ids
    ids=dict(request.GET)['ids[]']
    # convert all strings to numbers
    ids = list(map(int,ids))
    # append the App user
    ids.append(request.user.pk)
    # filter out duplicates
    ids=list(set(ids))
    users = AppUser.objects.filter(id__in=ids)
    playlistCollections=UserPlaylistCollection.objects.filter(user__in=users)
    topSongsPlaylists=Playlist.objects.filter(name='top songs', user_playlist_collection_id__in=playlistCollections)
    counters=[]
    for playlist in topSongsPlaylists:
       
        usersCount=Genre.objects.filter(artist__song__playlist = playlist).values('name').annotate(Count('name')).order_by('-name__count')
        print(usersCount)
        counters.append(list(usersCount))
# create a list of all genres
    all_genres = list(set([g['name'] for user in counters for g in user]))
# # create a matrix of genre counts for each user
    matrix = np.zeros((len(all_genres), len(counters))) 
    for i, genre in enumerate(all_genres):   
        for j, user in enumerate(counters): 
            count = [g['name__count'] for g in user if g['name'] == genre]
            matrix[i,j] = count[0] if count else 0
   

# loop through each list of arrays i.e [0,1,3] where each array represents a genre 
    group_genre_frequency = []
    for index,genre in enumerate(matrix):
        nonzeros = []
# if a user in the group likes a genre add it to the nonzeros array, from the array we will get the lowest value
# for the genre and use it as the base wieght of the group i.e rap [4,0,5]=> nonzeros 4,5 and lowest non zero is 4
# the score for the genre is then 4 * 10 ** 2. So if more users like a song it will be raised up by the exponential part of the equation
# but if two genres are like by the same amount of useres then the genre will be weighted according to user who liked it least
# for example rap [4,0,5] will be weighted more the rock [1,0,10]  
        for playlist_frequeny in genre:
            if playlist_frequeny != 0:
                nonzeros.append(playlist_frequeny)

        if nonzeros:
            lowest_nonzero = min(nonzeros)
            genre = (index, lowest_nonzero*(10**len(nonzeros)))
            group_genre_frequency.append(genre)
        else:
            genre = (index, 0)
            group_genre_frequency.append(genre)

    group_genre_frequency_sorted = sorted(group_genre_frequency, key=lambda x: x[1], reverse=True)
    


# return first 10 items or whole list
    top_ten_genres=[]
    first_ten=get_n_items(group_genre_frequency_sorted,10)

    for item in first_ten:
        top_ten_genres.append(all_genres[item[0]])
    return JsonResponse({'topGenres':top_ten_genres})
@api_view(['POST'])
def reccomendation(request):
    data=request.data
    data=data['checkboxes']
    # GET ALL GENRES with value of true
    genres=[]
    for key, value in data.items():
        if value:
            genres.append(key)

    # get how many artists to get by genre limit 5 for spotify API example  [genre1,genre2] => 3,2 if 3 => 3,1,1 
    dividend = 5
    divisor = len(genres)

    quotient = dividend // divisor
    remainder = dividend % divisor

    amount_from_each=[]
    for item in range(0,divisor):
        # first genre gets priority and gets remainder if 5 seed spots cant be equally divided
        if item == 0:
            amount_from_each.append(quotient+remainder)
        else:
            amount_from_each.append(quotient)
    
    seed_artists=[]
    for index,genre in enumerate(genres):
        # get all artists with genre name
        artists = Artist.objects.filter(genre__name = genre)
        artist_ids = list(artists.values_list('spotify_id', flat=True))
        # initialize how many artist ids we want
        sample_size = amount_from_each[index]
        # account for edge case where we want more then availible 
        if len(artist_ids) < sample_size:
            sample_size = len(artist_ids)
        # get random index from 0 -length of availible ids
        randomIndexValues = random.sample(range(len(artist_ids)), sample_size)
        # use those indexes to grab random associated artists
        for number in randomIndexValues:
            seed_artists.append(artist_ids[number])
    # api takes comma seperated string of artist ids
    spotify_params={
        'seed_artists':",".join(seed_artists)
    }

    url='https://api.spotify.com/v1/recommendations'
    headers1 = {"Authorization": "Bearer " + get_token(request.user)}
    response = requests.get(url,params=spotify_params, headers=headers1).json()
    token=get_token(request.user)
    response={
        'tracks':response['tracks'],
        'token':token
    }
    return JsonResponse(response,safe=False)