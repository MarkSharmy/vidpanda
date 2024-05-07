import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def youtube(request):
    
    if request.method == "POST":
        data = json.loads(request.body)
        link = data.get("url");

        response_data = {
            "type": "Video",
        }

        return JsonResponse(response_data)

@csrf_exempt
def playlist(request):
    
    if request.method == "POST":
        data = json.loads(request.body)
        link = data.get("url");

        response_data = {
            "type": "Playlist",
        }

        return JsonResponse(response_data)