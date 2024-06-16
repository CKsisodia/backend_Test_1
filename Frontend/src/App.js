import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import BlogForm from "./components/BlogForm";
import BlogPost from "./components/BlogPost";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = () => {
    fetch("http://localhost:5000/blog")
      .then((res) => res.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.log(error));
  };

  const updatePosts = () => {
    fetchBlogPosts();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={5}>
          <Item sx={{ backgroundColor: "#afdde5" }}>
            <BlogForm updatePosts={updatePosts}/>
          </Item>
        </Grid>
        <Grid item xs={6} md={7}>
          <BlogPost blogData={blogData} updatePosts={updatePosts}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
