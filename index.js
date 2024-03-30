const express = require("express");
const cors = require("cors");
const UserModel = require("./models/user");
const PostModel = require("./models/post");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// for backend root rout
app.get("/", (res, req) => {
  req.send("<h3>MERN Net.</h3>");
});

// for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No record");
    }
  });
});

// for register
app.post("/register", (req, res) => {
  const user = new UserModel(req.body);
  user
    .save()
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

// for post User Text
app.post("/post", (req, res) => {
  const post = new PostModel(req.body);
  post
    .save()
    .then((savePost) => {
      res.json(savePost);
    })
    .catch((err) => {
      res.json(err);
    });
});

// for get User Text
app.get("/post", async (req, res) => {
  try {
    const post = await PostModel.find({});
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// connect db and port
db();
app.listen(3000, () => {
  console.log("working");
});
