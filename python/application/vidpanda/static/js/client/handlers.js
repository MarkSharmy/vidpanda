import { retrievePlaylistData, retrieveVideoData } from "../api/controller.js";

export function refreshComponents()
{
    const container = document.getElementById("download-info");
    container.classList.remove("active");
}

export function searchHandler()
{
    const searchButton = document.getElementById("btn-search");
    const inputURL = document.getElementById("yt-link");

    searchButton.addEventListener("click", () => {

        let url = inputURL.value;
        const prompt = document.querySelector(".error");
        const type = parseURL(url);

        prompt.innerHTML = "";


        if(type === "Invalid" )
        {
            let message = "Invalid URL, Please Try Again.";
            prompt.innerText = message;
        }
        else if (type === "Playlist")
        {
            retrievePlaylistData(url);

            const loading = document.createElement("div");
            loading.classList.add("loading");
            prompt.appendChild(loading);
            
            let img = document.createElement("img");
            img.setAttribute("height", "56px");
            img.src = "/vidpanda/static/images/loading.gif";
            loading.appendChild(img);
        }
        else if (type === "Video")
        {
            retrieveVideoData(url);

            const loading = document.createElement("div");
            loading.classList.add("loading");
            prompt.appendChild(loading);
            
            let img = document.createElement("img");
            img.setAttribute("height", "56px");
            img.src = "/vidpanda/static/images/loading.gif";
            loading.appendChild(img);
            
        }
    });

}

function parseURL(url)
{
    const playlistRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:playlist\?|.*?&)?(?:list=)([^#\&\?\n]+)/;
    const videoRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|.*?&v=)?([^#\&\?\n]+)/;

    if (playlistRegex.test(url))
    {
        return 'Playlist';
    }
    else if (videoRegex.test(url))
    {
        return 'Video';
    }

    return 'Invalid';
}
