from django.shortcuts import render
from django.http import HttpResponse
from collections import OrderedDict
from pytube import YouTube # type: ignore
from pytube import Playlist #type: ignore
import json
import re

def home(request):
    return render(request, "index.html")

def download(request):

    if request.method == 'POST':
        json_data = json.loads(request.body)

        print(json_data)

def test_download(request):

    url = request.GET.get("yt-link")

    if is_playlist(url):

        #Create Playlist object
        playlist_obj = Playlist(url)

        #Extract all the available resolutions for streaming
        url_list = playlist_obj.video_urls
        videos = []

        for vid_url in url_list:

            yt = YouTube(vid_url)

            video = {
                "obj": yt,
                "url": vid_url,
                "title": yt.title,
                "thumbnail": yt.thumbnail_url
            }

            videos.append(video)

        
        #Define basic info
        link = url.replace("playlist?list=", "embed/")
        thumbnail_url = videos[0]["thumbnail"]
        title = playlist_obj.title
        

        context = {
            "vidoes": videos,
            "embed_link": link,
            "video_title": title,
            "thumbnail": thumbnail_url,
        }
    
    else:

        #Create YouTube object
        yt_obj = YouTube(url)

        #Extract all the available resolutions for streaming
        strm_all = yt_obj.streams
        resolutions = []

        for strm in strm_all:
            resolutions.append(strm.resolution)

        resolutions = list(dict.fromkeys(resolutions))
        
        #Define basic info
        link = url.replace("watch?v=", "embed/")
        thumbnail_url = yt_obj.thumbnail_url
        title = yt_obj.title
        

        context = {
            "resolution": resolutions,
            "embed_link": link,
            "video_title": title,
            "thumbnail": thumbnail_url,
        }

        
    return render(request, "download.html", context)
    

    

def is_playlist(link):

    video_pattern = r"youtube\.com/watch\?v=[\w-]+"
    playlist_pattern = r"youtube\.com/playlist\?list=[\w-]+"

    if re.search(playlist_pattern, link):

        print("Playlist!")
        return True
    
    elif re.search(video_pattern, link):
        print("Video")
        return False
    
    else:

        raise ValueError("Invalid link")
    

