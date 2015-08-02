from django.shortcuts import render
from django.views.generic import View


class HomeView(View):
    def get(self, request):
        return render(request, "pages/index.html" )


class ContactView(View):
    def get(self, request):
        return render(request, "pages/contact.html" )

class ProfileView(View):
    def get(self, request):
        return render(request, "pages/myProfile/indexProfile.html" )

class UniversityProfileView(View):
    def get(self, request):
        return render(request, "pages/myProfile/universityProfile.html" )