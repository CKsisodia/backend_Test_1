const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const sequelize = require("./utils/database");
const blogRoutes = require("./routes/blog");

app.use(bodyParser.json({ exteded: true }));
app.use(cors());

app.use("/blog", blogRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));
