from . import views
from django.urls import path

urlpatterns = [
    path('api/carjamz/users/', views.getuser),
    path('api/carjamz/users/common-intrests/',views.common_intrests)
]