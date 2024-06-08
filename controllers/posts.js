const { post } = require("../routes/post");

// const posts = [];
const Post = require("../models/post");
const { where } = require("sequelize");

exports.createPost = (req, res) => {
  const { title, description, photo } = req.body;
  req.user
    .createPost({
      title,
      description,
      img_url: photo,
    })
    .then((result) => {
      console.log(result);
      console.log("post created");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.renderCreatePage = (req, res) => {
  res.render("addPost", { title: "Post create ml" });
};

exports.getPosts = (req, res) => {
  Post.findAll({ order: [["title", "asc"]] })
    .then((posts) => {
      res.render("home", { title: "Home Page", postsArr: posts });
    })
    .catch((err) => console.log(err));
};

exports.getPose = (req, res) => {
  const postId = req.params.postId;
  //findByPk(postId) နဲ့ လည်းရ
  Post.findOne({ where: { id: postId } })
    .then((post) => {
      res.render("details", { title: "Post Details Page", post });
    })
    .catch((err) => console.log(err));
};

exports.deletePost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      if (!post) {
        res.redirect("/");
      }
      return post.destroy();
    })
    .then((result) => {
      console.log("finish delete");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getOldPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render("editPost", { title: `${post.title}`, post });
    })
    .catch((err) => console.log(err));
};

exports.updatePost = (req, res) => {
  const { title, description, photo, postId } = req.body;
  Post.findByPk(postId)
    .then((post) => {
      (post.title = title),
        (post.description = description),
        (post.imgUrl = photo);
      return post.save();
    })
    .then((result) => {
      console.log(`Post id ${postId} is updated`);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
