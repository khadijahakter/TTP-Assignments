const express = require("express");
const app = express();
const port = 4000;
const { Recipe } = require("./models");
require("dotenv").config();

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        console.log(`Response Status: ${res.statusCode}`);
    });
    next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
    if (collection.length === 0) return 1;
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
}

app.get("/recipes", async (req, res) => {
    try {
        const allRecipes = await Recipe.findAll();
        res.status(200).json(allRecipes);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.get("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);

    try {
        const recipe = await Recipe.findOne({ where: { id: recipeId } });

        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).send({ message: "Recipe not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.post("/recipes", async (req, res) => {
    const recipeData = req.body;
    try {
        const newRecipe = await Recipe.create(recipeData);
        res.status(201).json(newRecipe);
    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            return res.status(422).json({ errors: err.errors.map(e => e.message) });
        }
        console.error(err);
        res.status(500).json({ message: 'An unexpected error occurred.' });
    }
});

app.patch("/recipes/:id", async (req, res) => {
    const recipeId = parseInt(req.params.id, 10);

    try {
        const [numberOfAffectedRows, affectedRows] = await Recipe.update(req.body, { where: { id: recipeId }, returning: true });

        if (numberOfAffectedRows > 0) {
            res.status(200).json(affectedRows[0]);
        } else {
            res.status(404).send({ message: "Recipe not found" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.error(err);
    }
});

app.delete("/recipes/:id", async (req, res) => {
    const jobId = parseInt(req.params.id, 10);

    try {
        const deleteOp = await Recipe.destroy({ where: { id: jobId } });

        if (deleteOp > 0) {
            res.status(200).send({ message: "Recipe deleted successfully" });
        } else {
            res.status(404).send({ message: "Recipe not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});