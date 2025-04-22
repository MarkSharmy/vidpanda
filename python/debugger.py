from pytube import YouTube
from pytube.cli import on_progress
 
url = "https://www.youtube.com/watch?v=49AqUbcSBAM"
 
yt = YouTube(url, on_progress_callback = on_progress)
print(yt.title)
 
ys = yt.streams.get_highest_resolution()
ys.download()
print("Download successful")