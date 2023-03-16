from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from authorization.models import AppUser
# Create your views here.
@api_view(['GET'])
def getuser(request):
    email = request.GET.get('email')
    user = AppUser.objects.filter(email=email).first()
    if user:
        return JsonResponse({'found':True,
            'first_name':user.first_name,
                             'last_name':user.last_name,
                             'pk':user.pk})
    return JsonResponse({'found':False})