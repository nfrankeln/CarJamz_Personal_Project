from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate,login,logout
from authorization.models import AppUser 
from spotifyapi.models import UserPlaylistCollection, Playlist,Genre
from django.db.models import Count
from spotifyapi.utils import get_token
# Create your views here.
from django.http import HttpResponse, JsonResponse
def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp


@api_view(['POST'])
def register(request):
    try:
        User.objects.create_user(**request.data['signUpData'])
        http_request = request._request
        email = request.data['signUpData']['email']
        password = request.data['signUpData']['password']
        user = authenticate(http_request, email=email, password=password)
        login(http_request, user)
        return JsonResponse({'success': True})
    except Exception as e:
        print(e)
        return HttpResponse("User Creation Failed")

@api_view(['POST'])
def user_login(request):
    http_request = request._request
    email = request.data['loginData']['email']
    password = request.data['loginData']['password']
    # email = request.POST['email']
    # password = request.POST['password']
    print("here")
    user = authenticate(http_request, email=email, password=password)
    if user is not None:
        login(http_request, user)
        return HttpResponse("logged in")
    else:
        return HttpResponse("Either the username or password is incorrect")
@api_view(['POST'])
def user_logout(request):
    print("here")
    logout(request)
    return HttpResponse("logged out")

@api_view(['GET'])
def is_authenticated(request):
    permission = False
    try:
        user=request.user
        get_token(user)
        permission=True
    except:
        print("no token")

    if request.user.is_authenticated:
        return JsonResponse({'is_authenticated': True,'permission':permission})
    else:
        return JsonResponse({'is_authenticated': False,'permission':permission})
@api_view(['GET'])
def account_information(request):
    try:
        currentUser = AppUser.objects.get(email=request.user)
        first_name = currentUser.first_name
        last_name= currentUser.last_name
# TODO add way to check if user is just signed up but not authorized to spotfiy
        if currentUser:
            playlist_collection = UserPlaylistCollection.objects.get(user=currentUser)
            top_songs_playlist = Playlist.objects.filter(name='top songs', user_playlist_collection_id=playlist_collection).first()
            top_five_genre = Genre.objects.filter(artist__song__playlist = top_songs_playlist).annotate(num_songs=Count('artist__song__playlist__id')).order_by('-num_songs')[:5].values_list('name', flat=True)
            top_five_genre=list(top_five_genre)
            
    except Exception as e:
        print(e)
    return JsonResponse({
        'id':currentUser.pk,
        'firstName':first_name,
        'lastName':last_name,
        'top_five_genres':top_five_genre
    },safe=False)
