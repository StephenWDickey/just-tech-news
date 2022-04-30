async function upvoteClickHandler(event) {
    event.preventDefault();

    // to get post id we split the url string based on /
    // we take the last object in the array which is the post id

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // we do fetch request
    // we pass in id value from our split 
    // of the url string
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);