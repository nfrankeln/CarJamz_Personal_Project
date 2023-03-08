from . import views
from django.urls import path, re_path
app_name="authorization"
urlpatterns = [
    path('', views.index, name='home'),
    path('api/register/',views.register),
    path('api/login/',views.user_login),
    path('api/logout/',views.user_logout),
    path('api/is_authenticated/',views.is_authenticated),
    re_path(r'.*', views.index)
]



    