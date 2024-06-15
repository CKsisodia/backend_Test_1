const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Comments = require('./comments')

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "blog",
  }
);

Blog.hasMany(Comments, { foreignKey: 'blogId', as: 'comment', onDelete: 'CASCADE' });
Comments.belongsTo(Blog, { foreignKey: 'blogId', as: 'blog' });

module.exports = Blog;
