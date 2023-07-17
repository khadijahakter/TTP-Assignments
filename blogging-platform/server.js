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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});