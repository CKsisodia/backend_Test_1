import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";


import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const BlogPost = ({ blogData, updatePosts }) => {
  const [expanded, setExpanded] = useState([]);
  const [comments, setComments] = useState({});

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const handleSubmit = async (e, blogId) => {
    e.preventDefault();
    const comment = comments[blogId];

    try {
      await fetch(`http://localhost:5000/blog/${blogId}/comments`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });
      setComments((prev) => ({ ...prev, [blogId]: "" }));
      updatePosts();
      toast.success("Comment added successfully !")

    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (e, blogId) => {
    setComments((prev) => ({ ...prev, [blogId]: e.target.value }));
  };

  const deleteHandler = async (commentId, blogId) => {
    try {
      await fetch(
        `http://localhost:5000/blog/${blogId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      updatePosts();
      toast.success("Comment deleted !")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {blogData ? (
        blogData?.map((blog) => {
          return (
            <Accordion
              expanded={expanded.includes(blog.id)}
              onChange={handleChange(blog.id)}
              sx={{ backgroundColor: "#d1e8e2", mb: 2 }}
              key={blog?.id}
            >
              <AccordionSummary
                expandIcon={
                  expanded.includes(blog.id) ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{ color: "#2b7a78", fontWeight: 700 }}
              >
                {blog.title}
              </AccordionSummary>

              <AccordionDetails>
                <Typography sx={{ color: "#2b7a78", fontWeight: 700 }}>
                  Author :- {blog.author}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ ml: 4, mr: 4, mt: 1, color: "#2b7a78" }}
                >
                  {blog.content}
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <form onSubmit={(e) => handleSubmit(e, blog.id)}>
                  <Typography sx={{ color: "#2b7a78", fontWeight: 700 }}>
                    Comments
                  </Typography>
                  <TextField
                    name="comments"
                    id="comments"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            sx={{ color: "#6edb6f" }}
                            type="submit"
                          >
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleCommentChange(e, blog.id)}
                    value={comments[blog.id] || ""}
                    required
                  />
                </form>
                {blog?.comment?.map((item) => {
                  return (
                    <Box sx={{ ml: 4, mr: 4, mt: 1 }} key={item?.id}>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" sx={{ color: "#2b7a78" }}>
                          {item.comment}
                        </Typography>
                        <IconButton
                          sx={{ color: "#f76565" }}
                          onClick={() => deleteHandler(item.id, item.blogId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                      <Divider />
                    </Box>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Box>
          <Card
            sx={{
              p: "30px 0",
              textAlign: "center",
              backgroundColor: "#d1e8e2",
            }}
          >
            No Blogs Found !!{" "}
          </Card>
        </Box>
      )}
    </>
  );
};

export default BlogPost;
