"""erasmus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from shareErasmus.views.views import (HomeView, LoginView, ContactView, ProfileView, UniversityProfileView)
from shareErasmus.views.api import UniversityViewSet, CountryViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/1.0/university', UniversityViewSet)
router.register(r'api/1.0/country', CountryViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', HomeView.as_view()),
    url(r'^login$', LoginView.as_view()),
    url(r'^contacto$', ContactView.as_view()),
    url(r'^miPerfil$', ProfileView.as_view()),
    url(r'^miPerfil/universidad$', UniversityProfileView.as_view()),
    url(r'^data/universities$', UniversityProfileView.as_view()),

    #API
    url(r'^', include(router.urls)),
]
