
const search_button = document.getElementById("btn-search");

search_button.addEventListener("click", searchHandler());

function searchHandler()
{
    console.log("handling data")
    url_link = document.getElementById("yt-link").textContent;
    data = {link: url_link};

    console.log("sending data")
    fetch("/download", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          console.log('Response:', result);
          // Handle the response here
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle any errors here
        });
}