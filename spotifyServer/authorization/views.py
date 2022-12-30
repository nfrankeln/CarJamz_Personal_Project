from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
def index(request):
    file = open('static/index.html').read()
    resp = HttpResponse(file)
    return resp