async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    // get post id from url splitting
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if we have text in the comment form
    // we will fetch the api/comments endpoint
    // we will use a POST request
    // the body of the request will contain
    // the post id obtained from the array
    // and the text value from the form

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
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
    }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);