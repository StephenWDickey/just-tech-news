async function upvoteClickHandler(event) {
    event.preventDefault();
  
    // this will isolate the post id by splitting up
    // the url and returning the last chunk in the array
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
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
}
  
document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);