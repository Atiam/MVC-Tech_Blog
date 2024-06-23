const {Blog_post} = require('../models');

const blog_post_seed = [
    {
    "title": "Tech Blog Post 1",
    "content": "This is the first tech blog post.",
    "user_id": 1
},
{
    "title": "Tech Blog Post 2",
    "content": "This is the second tech blog post.",
    "user_id": 1
}
]

module.exports =  blog_post_seed;