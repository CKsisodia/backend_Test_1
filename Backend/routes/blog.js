const express = require("express");
const blogController = require("../controller/blog");
const router = express.Router();

router.post("/add-blog", blogController.createBlog);
router.get("/", blogController.getAllBlog);
router.delete("/:blogId", blogController.deleteBlog);
router.post("/:blogId/comments", blogController.createComment);
router.delete('/:blogId/comments/:commentId', blogController.deleteComment);


module.exports = router;
