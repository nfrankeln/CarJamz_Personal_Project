from django.shortcuts import render
from rest_framework.decorators import api_view
from authorization.models import AppUser as User
# Create your views here.
from django.http import HttpResponse
def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp

@api_view(['POST'])
def register(request):
    print(request.data)
    return HttpResponse("hello")
    # try:
    #     User.objects.create_user(**request.data['signUpData'])
    #     return HttpResponse("User Created")
    # except Exception as e:
    #     print(e)
    #     return HttpResponse("User Creation Failed")