const newBlog_post = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    
    if (title && content) {
        const response = await fetch('/api/blog_posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
        document.location.replace('/dashboard');
        } else {
        alert('Failed to create blog post');
        }
    }
    };
    document
    .querySelector('#publishBtn')
    .addEventListener('click', newBlog_post);