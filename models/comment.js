const {Model, DataTypes} = require('sequelize');
const sequelize = require(`../config/connection`);

class Comment extends Model {}
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
    
        },
               
              comment_content: { 
            type: DataTypes.STRING,

        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blog_post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog_post',
                key: 'id',
            },
        },
    
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;