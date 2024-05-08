import json
#from pytube import YouTube, Playlist #type: ignore
from .mocktest import YouTube
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def youtube(request):
    
    if request.method == "POST":
        
        data = json.loads(request.body)
        url = data.get("url")

        #Create YouTube Object
        yt_obj = YouTube(url)

        #Extract all the available resolutions for streaming
        #strm_all = yt_obj.streams
        # resolutions = []

        # for strm in strm_all:
        #     resolutions.append(strm.resolution)

        # resolutions = list(dict.fromkeys(resolutions))

        #NOTE: Patchy fix for testing:
        resolutions = ["1080p", "720p", "480p", "360p", "240p", "144p"]

        link = url.replace("watch?v=", "embed/")
        thumbnail_url = yt_obj.thumbnail_url
        title = yt_obj.title

        context = {
            "resolution": resolutions,
            "embed_link": link,
            "video_title": title,
            "thumbnail": thumbnail_url,
        }


        return JsonResponse(context)
    

@csrf_exempt
def playlist(request):
    
    if request.method == "POST":
        data = json.loads(request.body)
        link = data.get("url");

        response_data = {
            "type": "Playlist",
        }

        return JsonResponse(response_data)