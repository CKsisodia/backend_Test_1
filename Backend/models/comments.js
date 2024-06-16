const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Comments = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment : {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'blog',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
  },
  {
    timestamps: true,
    tableName: "comment",
  }
);

module.exports = Comments;
