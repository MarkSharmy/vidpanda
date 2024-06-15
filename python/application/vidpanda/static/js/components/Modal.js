import { downloadVideo } from "../api/controller.js";

export default class Modal extends HTMLElement
{
    css = `
        .text {
            display: block;
            font-family: var(--lato);
            text-align: center;
        }

        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            transition: 200ms ease-in-out;
            border: 1px solid var(--gray);
            border-radius: 1rem;
            z-index: 1000;
            background-color: var(--light);
            width: 40rem;
            height: 28rem;
            padding: 1rem;
        }

        .popup.active {
            transform: translate(-50%, -50%) scale(1)
        }

        .popup header {
            padding: 0.5rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--dark-gray);
        }

        .popup header .title {
            font-size: 1.2rem;
            font-weight: 400;
            font-family: var(--lato);
            color: var(--dark-gray);
            margin: auto;
        }


        .popup header .btn-close {
            cursor: pointer;
            border: none;
            outline: none;
            background: transparent;
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--dark-gray)
        }
        
        .popup .body {
            padding: 0.5rem 1rem;
        }

        .popup .body .ad-read {
            width: 14rem;
            height: 14rem;
            margin: auto;
        }

        .popup .body .ad-read img {
            width: 100%;
            height: 100%;
        }

        .popup .body .download{
            display: flex;
            justify-content: center;
            margin: 1rem auto;
        }

        .popup footer {
            padding: 1rem;
        }

        .popup footer .text {
            font-family: var(--lato);
            color: var(--dark-gray);
            text-align: center;
        }

        .btn-download {
            padding: 0.5rem 1rem;
            font-family: var(--poppins);
            font-weight: 500;
            background-color: var(--green);
            color: white;
            border: none;
            outline: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }

        .btn-download:hover {
            background-color: #005D00;
        }
    `;

    template()
    {
        return `
        <div class="popup active">
            <header>
                <h2 class="title">${this.title}</h2>
                <button class="btn-close">&times;</button>
            </header>
            <section class="body">
                <div class="ad-read">
                    <img src="/vidpanda/static/images/advertisement.jpg" alt="ad">
                </div>
                <div class="download">
                    <button class="btn-download">Download</button>
                </div>
            </section>
            <footer>
                <p class="text">Thank you for using Vidpanda. Please share with website
                    with your friends. Its helps to support us!</p>
            </footer>
        </div>`;
    }

    constructor(title, url, resolution)
    {
        super();

        this.url = url;
        this.title = title;
        this.resolution = resolution;
        this.attachShadow({mode: "open"});
        this.render();
    }

    render()
    {
        this.shadowRoot.innerHTML = `
        <style>${this.css.trim()}</style>
            ${this.template().trim()}
        `;

        const downloadButton = this.shadowRoot.querySelector(".btn-download");
        downloadButton.addEventListener("click", (e) => {
            this.onDownloadClick(this.url, this.resolution);
            e.target.innerText = "Downloading"

            const text = document.createElement("p");
            text.classList.add("text");
            text.innerText = "Please Wait...";
    
            this.shadowRoot.querySelector(".body").appendChild(text);
        });

       

        const closeButton = this.shadowRoot.querySelector(".btn-close");
        closeButton.addEventListener("click", () => {
            this.onModalClose();
            const overlay = document.getElementById("overlay");
            overlay.classList.remove("active");
        });
        
    }   

    onModalClose()
    {
        const container = document.querySelector("main");
        container.removeChild(this);
    }

    onDownloadClick(url, resolution)
    {
        downloadVideo(url, resolution);
    }
}