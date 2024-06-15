import os
import re
import json
from pytube import YouTube, Playlist #type: ignore
#from .mocktest import YouTube
from django.http import JsonResponse
from django.http import FileResponse
from django.views.decorators.csrf import csrf_exempt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@csrf_exempt
def youtube(request):
    
    if request.method == "POST":
        
        data = json.loads(request.body)
        url = data.get("url")

        #Create YouTube Object
        yt_obj = YouTube(url)

        #Extract all the available resolutions for streaming
        strm_all = yt_obj.streams
        resolutions = []
        video_sizes = []

        for strm in strm_all:
            resolutions.append(strm.resolution)

        resolutions = list(dict.fromkeys(resolutions))
        resolutions = [quality for quality in resolutions if quality is not None]
        resolutions = sorted(resolutions, key=lambda x: int(x[:-1]), reverse=True)

        for resolution in resolutions:

            video_stream = yt_obj.streams.filter(res=resolution).first()

            if video_stream is not None:
                video_size = video_stream.filesize
                video_sizes.append(video_size)

        #NOTE: Patchy fix for testing:
        #resolutions = ["1080p", "720p", "480p", "360p", "240p", "144p"]

        link = url.replace("watch?v=", "embed/")
        thumbnail_url = yt_obj.thumbnail_url
        title = yt_obj.title

        context = {
            "resolution": resolutions,
            "video_size": video_sizes,
            "embed_link": link,
            "title": title,
            "thumbnail": thumbnail_url,
            "url": url
        }


        return JsonResponse(context)

@csrf_exempt
def download_youtube(request):

    if request.method == "POST":

        data = json.loads(request.body)
        url = data.get("url")

        output_folder = "tmp/"

        desired_resolution = data.get("resolution")

        yt = YouTube(url)

        # Filter streams based on resolution
        streams = yt.streams.filter(res=desired_resolution)
        # Select the first stream (highest resolution)
        stream = streams.first()
        print("STREAM:", stream)


        # Download the video
        print("Downloading...")
        stream.download(output_path=output_folder)
        print("Download complete")

        title = sanitize_filename(yt.title, ".mp4")

        # Specify the file path
        video_path = output_folder + title

        response = FileResponse(open(video_path, 'rb'), content_type='video/mp4')
        response['Content-Disposition'] = f"attachment; filename={title}"
        
        return response

     

@csrf_exempt
def playlist(request):
    
    if request.method == "POST":
        data = json.loads(request.body)
        link = data.get("url");

        response_data = {
            "type": "Playlist",
        }

        return JsonResponse(response_data)
    
def sanitize_filename(filename, extension):
    # Define a pattern to match symbols that cannot be used in a file name
    pattern = r"[#<>:\"/\\|?*]"

    # Use regex to find and remove symbols from the filename
    sanitized_filename = re.sub(pattern, "", filename)

    return sanitized_filename + extension