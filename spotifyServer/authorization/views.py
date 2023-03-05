from django.shortcuts import render
from django.conf import settings
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate,login,logout
from authorization.models import AppUser as User
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
        return HttpResponse("User Created")
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
    #     TODO Redirect to a success page.
    else:
        print("user not found")
    #     TODO Return an 'invalid login' error message.
    #     ...
    return HttpResponse('ok')
@api_view(['POST'])
def user_logout(request):
    print("here")
    logout(request)
    return HttpResponse("logged out")
@api_view(['GET'])
def is_authenicated(request):
    print(request.user.is_authenticated)
    print(request.user)
    response_data = {
        "authenticated": request.user.is_authenticated
    }
    return JsonResponse(response_data)
