from django.urls import path
from . import views, controller

urlpatterns = [
    path("", views.home, name="home"),
    path("youtube/", controller.youtube),
    path("playlist/", controller.playlist),
]