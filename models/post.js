const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Post = sequelize.define("post", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img_url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Post;
