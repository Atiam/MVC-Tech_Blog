//
const User = require("./user");
const Comment = require("./comment");
const Blog_post = require("./blog_post");

Blog_post.belongsTo(User, {
    foreignKey: 'user_id',
    // onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

Blog_post.hasMany(Comment, {
    foreignKey: 'blog_post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Comment, Blog_post };