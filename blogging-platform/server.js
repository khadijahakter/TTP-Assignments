const express = require("express");
const app = express();
const port = 4000;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { User, Post, Comment } = require("./models");
require("dotenv").config();

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        // the 'finish' event will be emitted when the response is handed over to the OS
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 3600000, // 1 hour
        },
    })
);
const authenticateUser = (req, res, next) => {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ message: "You must be logged in to view this page." });
    }
    next();
};

// const authorizeModification = async (req, res, model, id) => {
//     const record = await model.findOne({ where: { id: id } });
//     if (record && record.UserId !== parseInt(req.session.userId, 10)) {
//         return res
//             .status(403)
//             .json({ message: "You are not authorized to perform that action." });
//     }
// };

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

app.post("/login", async (req, res) => {
    try {
        // find the user based on the email address in the body
        const user = await User.findOne({ where: { email: req.body.email } });

        if (user === null) {
            return res.status(401).json({
                message: "Incorrect credentials"
            })
        }

        bcrypt.compare(req.body.password, user.password, (error, result) => {
            if (result) {
                // passwords match
                req.session.userId = user.id;
                res.status(200).json({
                    message: "Logged in successfully",
                    user: {
                        name: user.name,
                        email: user.email
                    }
                })
            } else {
                // passwords don't match
                return res.status(401).json({
                    message: "Incorrect credentials",
                });
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during the login process" })
    }
});

app.delete("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }

        res.clearCookie("connect.sid");
        return res.sendStatus(200);
    });
});

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
app.delete("/posts/:id", authenticateUser, async (req, res) => {
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

// Get all the comments for a specific Post (help)
app.get("/comments", authenticateUser, async (req, res) => {
    try {
        const allComments = await Comment.findAll();
        res.status(200).json(allComments);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Get a specific comment
app.get("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);

    try {
        const comment = await Comment.findOne({ where: { id: commentId } });

        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).send({ message: "Comment not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Create a new comment
app.post("/comments", authenticateUser, async (req, res) => {
    try {
        const newComment = await Comment.create(req.body);

        res.status(201).json(newComment);
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Update a specific comment
app.patch("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);

    try {
        const record = await Comment.findOne({ where: { id: commentId } });
        if (record && record.UserId !== parseInt(req.session.userId, 10)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to perform that action." });
        }
        const [numberOfAffectedRows, affectedRows] = await Comment.update(
            req.body,
            { where: { id: commentId }, returning: true }
        );

        if (numberOfAffectedRows > 0) {
            res.status(200).json(affectedRows[0]);
        } else {
            res.status(404).send({ message: "Comment not found." });
        }
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

// Delete a specific comment
app.delete("/comments/:id", authenticateUser, async (req, res) => {
    const commentId = parseInt(req.params.id, 10);

    try {
        const record = await Comment.findOne({ where: { id: commentId } });
        if (record && record.UserId !== parseInt(req.session.userId, 10)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to perform that action." });
        }
        const deleteOp = await Post.destroy({ where: { id: commentId } });

        if (deleteOp > 0) {
            res.status(200).send({ message: "Comment deleted successfully" });
        } else {
            res.status(404).send({ message: "Comment not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});