from django.shortcuts import render
from collections import OrderedDict
from pytube import YouTube # type: ignore

def home(request):
    return render(request, "index.html")

def download(request):
    url = request.GET.get("yt-link")

    obj = YouTube(url)
    
    resolutions = []

    

    strm_all = obj.streams

    for strm in strm_all:
        resolutions.append(strm.resolution)

    resolutions = list(dict.fromkeys(resolutions))
    link = url.replace("watch?v=", "embed/")
    thumbnail_url = obj.thumbnail_url
    video_title = obj.title

    context = {
        "resolution": resolutions,
        "embed_link": link,
        "video_title": video_title,
        "thumbnail": thumbnail_url,
    }

    
    return render(request, "download.html", context)
