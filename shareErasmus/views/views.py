from django.shortcuts import render
from django.views.generic import View
from erasmus import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from shareErasmus.models import University, Subject, UserProfile
import json
import datetime

def loadJson(file):
    json_data = open(file)
    data1 = json.load(json_data) # deserialises it
    data2 = json.dumps(json_data) # json formatted string
    json_data.close()
    return data1



class HomeView(View):
    def get(self, request):
        return render(request, "pages/index.html")


class UniversitiesView(View):
    def get(self, request):
        return render(request, "pages/universities.html")




#SACAR FUERA DE VIEWS.PY
def registerUser(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    user = User.objects.create_user(username,email,password)
    user.save()
    userProfile = UserProfile(user=user)
    userProfile.save()

#SACAR FUERA DE VIEWS.PY
def authenticateUser(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(password=password,username=username)
    if user:
        login(request, user)
    else:
        pass


class LoginView(View):
    def get(self, request):
        return render(request, "pages/login.html")

    def post(self, request):
        if 'sign-in' in request.POST:
            registerUser(request)
        elif 'login' in request.POST:
            authenticateUser(request)

        return render(request, "pages/index.html")



class ContactView(View):
    def get(self, request):
        return render(request, "pages/contact.html")

###############
#Settings views#
###############
class AccountView(View):
    def get(self, request):
  #      if request.user.is_authenticated():
            return render(request, "pages/settings/account.html")
 #       else:
 #           return render(request, "accessDenied.html")


class MyUniversitiesView(View):
    def get(self, request):
        return render(request, "pages/settings/myUniversities.html")



class UniversityProfileView(View):
    def get(self, request):
        pass
