from django.urls import path
from . import views, controller

urlpatterns = [
    path("", views.home, name="home"),
    path("youtube/", controller.youtube),
    path("youtube/download/", controller.download_youtube),
    path("playlist/", controller.playlist),
]