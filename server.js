const express = require("express");
const multer = require("multer");
require("dotenv").config();
const path = require("path");
const dbConnect = require("./config/connectDB");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const mongodb = require("mongodb");
app.listen(PORT, (err) =>
  err ? console.error : console.log("server is running")
);
const authRouter = require("./routes/auth");

// connect DB
dbConnect();
//body parse midware
app.use(express.json());
//create route

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({
  storage: storage,
});
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://Marouane:Papi2012**@cluster0.pa7ug.mongodb.net/Bug-tracker?retryWrites=true&w=majority";

MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("images");
  }
);

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/client/src/components/Register/Register.js");
});
app.post("/register", upload.single("userImage"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("base64");
  var finalImg = {
    contentType: req.file.mimetype,
    path: req.file.path,
    image: new Buffer.from(encode_image, "base64"),
  };
  db.collection("image").insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to db");
    res.contentType(finalImg.contentType);
    res.send(finalImg.image);
  });
});

app.use("/api/bugPost", require("./routes/bugPosts"));
app.use("/api/user", require("./routes/users"));

app.use("/api/auth", authRouter);

// // serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
