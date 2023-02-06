from . import views
from django.urls import path, re_path
app_name="autherization"
urlpatterns = [
    path('', views.index),
    path('api/register/',views.register),
    re_path(r'.*', views.index)
]



    