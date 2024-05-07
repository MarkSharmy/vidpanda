
export function retrieveVideoData(url)
{
    const data = {
        url: url,
    };

    const params = new URLSearchParams(data)
      
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
        console.log(responseData);
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    });

}

export function retrievePlaylistData(url)
{
    const data = {
        url: url,
    };

    const params = new URLSearchParams(data)
      
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
        console.log(responseData);
    })
    .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
    });

}