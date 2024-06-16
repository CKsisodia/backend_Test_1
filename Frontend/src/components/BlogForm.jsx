import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const BlogForm = ({updatePosts}) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
  });

  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/blog/add-blog", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      updatePosts()
    } catch (error) {
      console.log(error);
    }
    setFormData({
      title: "",
      author: "",
      content: "",
    });
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ color: "#124e66", fontWeight: 600, mb: 2 }}
      >
        Create a new blog post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            alignItems: "flex-start",
          }}
        >
          <Typography sx={{ color: "#124e66", fontWeight: 600 }}>
            Blog Title :-
          </Typography>
          <TextField
            name="title"
            id="title"
            variant="outlined"
            size="small"
            fullWidth
            onChange={formHandler}
            value={formData.title || ""}
            required
          />
          <Typography sx={{ color: "#124e66", fontWeight: 600 }}>
            Blog Author :-
          </Typography>
          <TextField
            name="author"
            id="author"
            variant="outlined"
            size="small"
            fullWidth
            onChange={formHandler}
            value={formData.author || ""}
            required
          />
          <Typography sx={{ color: "#124e66", fontWeight: 600 }}>
            Blog Content :-
          </Typography>
          <TextField
            name="content"
            id="outlined-multiline-static"
            multiline
            rows={4}
            fullWidth
            onChange={formHandler}
            value={formData.content || ""}
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#0fa4af",
              color: "#124e66",
              "&:hover": {
                backgroundColor: "#098891",
              },
              fontWeight: 600,
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default BlogForm;
