from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate,login,logout
from authorization.models import AppUser as User
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

