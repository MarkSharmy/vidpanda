import os
import re
import json
from pytubefix import YouTube, Playlist #type: ignore
from pytubefix.cli import on_progress #type: ignore
#from .mocktest import YouTube
from django.http import JsonResponse
from django.http import StreamingHttpResponse
from django.views.decorators.csrf import csrf_exempt

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

@csrf_exempt
def youtube(request):
    
    if request.method == "POST":
        
        data = json.loads(request.body)
        url = data.get("url")

        #Create YouTube Object
        yt_obj = YouTube(url, on_progress_callback = on_progress)

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
        
        title = sanitize_filename(yt.title, ".mp4")

        def generate_chunks():
            for chunk in stream.iter_content(chunk_size=1024):
                yield chunk

        response = StreamingHttpResponse(generate_chunks(), content_type='video/mp4')
        response['Content-Disposition'] = f'attachment; filename="{title}"'

        return response

     

@csrf_exempt
def playlist(request):

    if request.method == "POST":
        
        data = json.loads(request.body)
        url = data.get("url")
        videos = []

        #Create Playlist Object
        playlist_obj = Playlist(url)


        link = url.replace("playlist?list=", "embed/")
        thumbnail_url = playlist_obj.videos[0].thumbnail_url
        title = playlist_obj.title
        
        for video in playlist_obj.video_urls:
            videos.append({
                "url": video,
                "thumbnail": YouTube(video).thumbnail_url,
                "title": YouTube(video).title
            })

        context = {
            "url": url,
            "title": title,
            "videos": videos,
            "embed_link": link,
            "thumbnail": thumbnail_url,
        }

        return JsonResponse(context)
    
def sanitize_filename(filename, extension):
    # Define a pattern to match symbols that cannot be used in a file name
    pattern = r"[#<>:\"/\\|?*]"

    # Use regex to find and remove symbols from the filename
    sanitized_filename = re.sub(pattern, "", filename)

    return sanitized_filename + extension

def on_progress(stream, chunk, bytes_remaining):
    total_size = stream.filesize
    bytes_downloaded = total_size - bytes_remaining
    percentage = (bytes_downloaded / total_size) * 100
    print(f"Downloading... {percentage:.2f}%")