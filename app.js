const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const app = express();
const path = require("path");
// require("dotenv").config();
const { ATLAS_URI } = require("./Config/keys");

app.use(express.json());

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("client/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });

// }
// const uri = process.env.ATLAS_URI;
const uri = ATLAS_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established succesfully");
});

const authRoutes = require("./Routes/userRoute");
const bloodRoutes = require("./Routes/bloodRoute");
const donorRoutes = require("./Routes/donorRoute");

app.use("/api", authRoutes);
app.use("/api", bloodRoutes);
app.use("/api", donorRoutes);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname ,"client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
