const newComment = async (event) => {
    event.preventDefault();
    
    const content = document.querySelector('#comment-content').value.trim();
    const blog_post_id = document.querySelector('#comment-blog_post_id').value.trim();
    
    if (content && blog_post_id) {
        const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content, blog_post_id }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.reload();
        } else {
        alert('Failed to create comment');
        }
    }
    };

    document
    .querySelector('#commentBtn')
    .addEventListener('click', newComment);