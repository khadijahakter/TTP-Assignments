const express = require("express");
const app = express();
const port = 4000;
const recipes = require("./recipes")

app.get("/", (req, res) => {
  res.send("Welcome to the Job Application Tracker API!");
});

// List all recipes
app.get("/recipes", (req, res) => {
  res.send(recipes);
});

// Get a specific recipe
app.get("/recipes/:id", (req, res) => {
  const recipeId = parseInt(req.params.id, 10);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  if (recipe) {
    res.send(recipe);
  } else {
    res.status(404).send({ message: "Recipe does not exist"})
  }
});

// Create a new recipe
app.post("/recipes", (req, res) => {
    const newRecipe = {
        ...req.body,
        id: getNextIdFromCollection(recipes)
    };
    recipes.push(newRecipe);
    res.status(201).send(newRecipe);
    // console.log("newRecipe", newRecipe);
    // res.send(newRecipe);
});

// Update a specific recipe
app.patch("/recipes/:id", (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipeUpdates = req.body;
    const recipeIndex = recipes.findIndex(job => recipe.id === recipeId);
    const updatedRecipe = {
        ...recipes[recipeIndex],
        ...recipeUpdates
    };
    if (recipeIndex !== -1) {
        recipes[recipeIndex] = updatedRecipe;
        res.send(updatedRecipe);
    } else {
        res.status(404).send({ message: "Recipe does not exist" });
    }
});

// Delete a specific recipe
app.delete("/recipes/:id", (req, res) => {
    const recipeId = parseInt(req.params.id, 10);
    const recipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
    if (jobIndex !== -1) {
        recipes.splice(recipeIndex, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send({ message: "Recipe deleted successfully" });
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

