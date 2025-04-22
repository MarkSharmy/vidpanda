import {loadVideoTable, loadPlaylistTable} from "../client/components.js";

export function retrieveVideoData(url)
{
    const data = {
        url: url,
    };

    const params = new URLSearchParams(data)
    const prompt = document.querySelector(".error");
      
    fetch(`youtube/?${params}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        // Process the response data here
        loadVideoTable(responseData);
        prompt.innerHTML = "";
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        prompt.innerHTML = "";
    });

}

export function downloadVideo(url, resolution)
{
    console.log("Downloading...");
    console.log("URL:", url);
    console.log("Resolution:", resolution);

    const data = {
        url: url,
        resolution: resolution
    };

    let filename = null;

    const params = new URLSearchParams(data)
    const prompt = document.querySelector(".error");

    fetch(`youtube/download/?${params}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Get the suggested file name from the Content-Disposition header
            const contentDisposition = response.headers.get('content-disposition');

            const fileNameMatch = contentDisposition.match(/filename=([^;]+)/);
            const suggestedFileName = fileNameMatch ? fileNameMatch[1] : 'video.mp4';

            filename = suggestedFileName;

            return response.blob();
        })
        .then(blob => {
          // Create a URL for the blob object

          const videoUrl = URL.createObjectURL(blob);

          // Create an anchor element for downloading
          const link = document.createElement('a');
          link.href = videoUrl;
          link.download = filename; // Replace with desired file name
      
          // Trigger the download
          link.click();
      
          // Clean up by revoking the object URL
          URL.revokeObjectURL(videoUrl);
        })
        .catch(error => {
          // Handle any errors
          console.error('Error:', error);
          prompt.innerHTML = "";
        });
}

export function retrievePlaylistData(url)
{
    const data = {
        url: url,
    };

    const params = new URLSearchParams(data)
    const prompt = document.querySelector(".error");
      
    fetch(`playlist/?${params}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        // Process the response data here
        loadPlaylistTable(responseData);
        prompt.innerHTML = "";
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
        prompt.innerHTML = "";
    });

}