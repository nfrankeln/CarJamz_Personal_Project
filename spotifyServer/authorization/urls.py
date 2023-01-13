from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    re_path(r'.*', views.index)
]