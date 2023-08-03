require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const favicon = require("serve-favicon");
const multer = require("multer");

const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "projects"); // Specify the directory where you want to save the uploaded files
  },
  filename: (req, file, cb) => {
    // Rename the file to a unique name (you can customize the naming logic as per your requirements)
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});
const upload = multer({ dest: "projects/" });
app.post("/songs", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file received." });
  }
  // You can access the uploaded file info using req.file
  // You can save the file info in your database or perform any other operation with it

  return res.status(200).json({ message: "Audio file uploaded successfully." });
});

const userRouter = require("./routes/api/users")
const postRouter = require('./routes/api/posts')
const songRouter = require("./routes/api/songs")
const playlistRouter = require("./routes/api/playlists");
// const likesRouter = require('./routes/api/likes')
// add in when the app is ready to be deployed
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger("dev"));


// This handles http requests with json in body, the parses the req.body from json into an object
app.use(express.json());


// Configure the auth middleware
// This decodes the jwt token, and assigns
// the user information to req.user
app.use(require("./config/auth"));
// api routes must be before the "catch all" route
app.use("/api/users", userRouter);
app.use('/api/posts', postRouter);
app.use("/api/songs", songRouter);
app.use("/api/playlists", playlistRouter);
// "catch all" route
// "catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// File upload route
app.post("/songs", upload.single("file"), (req, res) => {
  // Handle the uploaded file here
  console.log(req.file); // This will log the details of the uploaded file

  // You can save the file to a specific folder or perform other operations here

  res.status(200).send("File uploaded successfully");
});


const port = process.env.PORT || 3001;




const { PORT = 8000 } = process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
