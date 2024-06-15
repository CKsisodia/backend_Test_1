const Blog = require("../models/blog");
const Comments = require("../models/comments");

exports.createBlog = async (req, res, next) => {
  try {
    const { title, author, content } = req.body;
    if (!title || !author || !content) {
      return res
        .status(400)
        .json({ error: "Title, author, and content are required fields." });
    }
    const blog = await Blog.create({ title, author, content });
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: { model: Comments, as: "comment" },
    });
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    console.log(blogId);
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }
    await blog.destroy();
    return res.status(200).json({ message: "Blog Deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;

    console.log(blogId, comment);

    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }
    const newComment = await Comments.create({ comment, blogId });
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { blogId, commentId } = req.params;
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found." });
    }

    const comment = await Comments.findOne({
      where: {
        id: commentId,
        blogId: blogId,
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    await comment.destroy();

    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
