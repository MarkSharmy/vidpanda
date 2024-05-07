import { retrievePlaylistData, retrieveVideoData } from "../api/controller.js";

export function searchHandler()
{
    const searchButton = document.getElementById("btn-search");
    const inputURL = document.getElementById("yt-link");

    searchButton.addEventListener("click", () => {

        let url = inputURL.value;
        let prompt = document.querySelector(".error");
        const type = parseURL(url);
        prompt.innerHTML = "";

        if(type === "Invalid" )
        {
            let message = "Invalid URL, pleaser try again";
            prompt.innerText = message;
        }
        else if (type === "Playlist")
        {
            retrievePlaylistData(url);
        }
        else if (type === "Video")
        {
            retrieveVideoData(url);
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