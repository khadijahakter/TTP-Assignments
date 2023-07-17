const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const { User } = require("./models");
// require("dotenv").config();

app.get("/", (req, res) => {
    res.send("Welcome to the Blogging Platform!");
});

app.post("/signup", async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        req.session.userId = user.id; // log the user in before sending response
        res.status(201).json({
            message: "User created!",
            user: {
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res
                .status(422)
                .json({ errors: error.errors.map((e) => e.message) });
        }
        console.error(error);
        res.status(500).json({
            message: "Error occurred while creating a new user account"
        })
    }
})

// Get all the posts
app.get("/posts", authenticateUser, async (req, res) => {
    try {
      const allPosts = await Post.findAll();
  
      res.status(200).json(allPosts);
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

// Get a specific post
app.get("/posts/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try {
      const post = await Post.findOne({ where: { id: postId } });
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send({ message: "Post not found." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

// Create a new post
app.post("/posts", authenticateUser, async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
  
      res.status(201).json(newPost);
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Update a specific post
  app.patch("/posts/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try {
      const record = await Post.findOne({ where: { id: postId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform that action." });
      }
      const [numberOfAffectedRows, affectedRows] = await Post.update(
        req.body,
        { where: { id: postId }, returning: true }
      );
  
      if (numberOfAffectedRows > 0) {
        res.status(200).json(affectedRows[0]);
      } else {
        res.status(404).send({ message: "Post not found." });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(422).json({ errors: err.errors.map((e) => e.message) });
      }
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

  // Delete a specific post
app.delete("/postspost/:id", authenticateUser, async (req, res) => {
    const postId = parseInt(req.params.id, 10);
  
    try {
      const record = await Post.findOne({ where: { id: postId } });
      if (record && record.UserId !== parseInt(req.session.userId, 10)) {
        return res
          .status(403)
          .json({ message: "You are not authorized to perform that action." });
      }
      const deleteOp = await Post.destroy({ where: { id: postId } });
  
      if (deleteOp > 0) {
        res.status(200).send({ message: "Post deleted successfully" });
      } else {
        res.status(404).send({ message: "Post not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: err.message });
    }
  });

/*
Task 5: CRUD Operations for Comments 

Implement CRUD operations for the Comments resource.
Create API endpoints to handle the following operations:
Create a new Comment.
Retrieve all Comments for a specific Post.
Retrieve a specific Comment by ID.
Update a Comment.
Delete a Comment.
Ensure that only authenticated users can perform CRUD operations on Comments.
Test the CRUD operations using Postman.
*/

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});