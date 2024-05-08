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
            let img = document.createElement("img");
            img.setAttribute("height", "56px");
            img.src = "/vidpanda/static/images/loading.gif";
            prompt.appendChild(img);
        }
        else if (type === "Video")
        {
            retrieveVideoData(url);
            let img = document.createElement("img");
            img.setAttribute("height", "56px");
            img.src = "/vidpanda/static/images/loading.gif";
            prompt.appendChild(img)
        }
    });

}

export function loadVideoTable(data)
{
    const container = document.getElementById("download-info");
    container.classList.add("active");
    const img = document.getElementById("thumbnail");
    img.src = data.thumbnail

    const resolutions = data.resolution
    const tbody = document.querySelector("tbody");

    resolutions.forEach(res => {
        let downloadButton = document.createElement("button");
        downloadButton.innerText = "Download"
        let row = document.createElement("tr");
        let resData = document.createElement("td");
        resData.innerText = res;
        row.appendChild(resData);
        let sizeData = document.createElement("td");
        row.appendChild(sizeData);
        let actionData = document.createElement("td");
        actionData.appendChild(downloadButton);
        row.appendChild(actionData);
        tbody.appendChild(row);
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

export function openModalHandler()
{

}

export function closeModalHandler()
{

}

export function downloadHandler()
{

}

export function playlistHandler()
{

}