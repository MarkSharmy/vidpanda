import Modal from "../components/Modal.js";

export function loadVideoTable(data)
{
    const container = document.getElementById("download-info");
    container.classList.add("active");
    const img = document.getElementById("thumbnail");
    img.src = data.thumbnail;

    const resolutions = data.resolution;
    const sizes = data.video_size;
    const tbody = document.querySelector("tbody");

    resolutions.forEach(res => {
        let downloadButton = document.createElement("button");
        downloadButton.classList.add("btn-download");
        downloadButton.innerText = "Download";
        downloadButton.setAttribute("data-quality", new String(res));
        downloadButton.addEventListener("click", () => openModal(data.title, data.url, downloadButton));
        let row = document.createElement("tr");
        let resData = document.createElement("td");
        resData.innerText = res;
        row.appendChild(resData);
        let sizeData = document.createElement("td");
        sizeData.textContent = `${Number(parseInt(sizes[resolutions.indexOf(res)]) / 1000000).toFixed(2)} MB`;
        row.appendChild(sizeData);
        let actionData = document.createElement("td");
        actionData.appendChild(downloadButton);
        row.appendChild(actionData);
        tbody.appendChild(row);
    });

}

export function loadPlaylistTable(data)
{
    const container = document.getElementById("playlist-info");
    let header = document.createElement("header");
    container.appendChild(header);

    const thumbnail = document.createElement("img");
    thumbnail.src = data.thumbnail;
    header.appendChild(thumbnail);

    const navbar =  document.createElement("nav");
    container.appendChild(navbar);

    let title_div = document.createElement("div");
    title_div.classList.add("title");
    navbar.appendChild(title_div);

    let title = document.createElement("h2");
    title.innerText = data.title;
    title_div.appendChild(title);

    let res_div = document.createElement("div");
    res_div.classList.add("resolution");
    navbar.appendChild(res_div);

    let selection = document.createElement("select");
    selection.name = "resolution";
    selection.value = "720p";
    res_div.appendChild(selection);

    let option_1080 = document.createElement("option");
    option_1080.value = "1080p";
    option_1080.innerText = "1080p";
    selection.appendChild(option_1080);
    
    let option_720 = document.createElement("option");
    option_720.value = "720p";
    option_720.innerText = "720p";
    selection.appendChild(option_720);
    
    let option_480 = document.createElement("option");
    option_480.value = "480p";
    option_480.innerText = "480p";
    selection.appendChild(option_480);
    
    let option_360 = document.createElement("option");
    option_360.value = "360p";
    option_360.innerText = "360p";
    selection.appendChild(option_360);
    
    let option_240 = document.createElement("option");
    option_240.value = "240p";
    option_240.innerText = "240p";
    selection.appendChild(option_240);
    
    let option_144 = document.createElement("option");
    option_144.value = "144p";
    option_144.innerText = "144p";
    selection.appendChild(option_144);
    
    let button_div = document.createElement("div");
    button_div.classList.add("btn-container");
    navbar.appendChild(button_div);

    let downloadButton = document.createElement("button");
    downloadButton.classList.add("btn-download");
    downloadButton.innerText = "Download All";
    button_div.appendChild(downloadButton);

    const playlist = document.createElement("ul");
    playlist.classList.add("playlist");
    container.appendChild(playlist);

    data.videos.forEach(video => {
        const listContainer = document.createElement("li");
        playlist.appendChild(listContainer);

        let thumbnailDiv = document.createElement("div");
        thumbnailDiv.classList.add("thumbnail");
        listContainer.appendChild(thumbnailDiv);

        let img = document.createElement("img");
        img.src = video.thumbnail;
        img.setAttribute("height", "48");
        thumbnailDiv.appendChild(img);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        listContainer.appendChild(titleDiv);

        let videoTitle = document.createElement("h3");
        videoTitle.innerText = video.title;
        titleDiv.appendChild(videoTitle);

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        listContainer.appendChild(btnContainer);

        let btn_download = document.createElement("button");
        btn_download.classList.add("btn-download");
        btn_download.innerText = "Download";
        btnContainer.appendChild(btn_download);

    });
}

function openModal(title, url, element)
{
    const container = document.querySelector("main");
    const overlay = document.getElementById("overlay");
    overlay.classList.add("active");

    const resolution = element.getAttribute("data-quality");
    const modal = new Modal(title, url, resolution);
    container.appendChild(modal);
}