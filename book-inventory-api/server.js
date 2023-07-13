const express = require("express");
const app = express();
const port = 4000;
const { query } = require("./database.js");
require("dotenv").config();

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
        console.log(`Response status: ${res.statusCode}`);
    });
    next();
});
app.use(express.json());

function getNextIdFromCollection(collection) {
    if (collection.length === 0) return 1;
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
}

app.get("/books", async (req, res) => {
    try {
        const allBooks = await query("SELECT * FROM books");
        res.json(allBooks.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    try {
        const book = await query("SELECT * FROM books WHERE id = $1", [
            bookId,
        ]);
        const foundBook = book.rows[0];
        if (foundBook) {
            res.json(foundBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/books", async (req, res) => {
    const {
        title,
        author,
        genre,
        quantity,
    } = req.body;
    try {
        const newBook = await query(
            `INSERT INTO books ( 
          author, title, genre, quantity) 
          VALUES ($1, $2, $3, $4)
          RETURNING *`,
            [author, title, genre, quantity]
        )
        console.log(newBook)
        res.status(201).json(newBook.rows[0]);
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.patch("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const { title, author, genre, quantity, } = req.body;

    try {
        const updatedBook = await query(
            `UPDATE books 
        SET title = $1, author = $2, genre = $3, quantity = $4
        WHERE id = $5
        RETURNING *`,
            [title, author, genre, quantity, bookId]
        );

        const foundBook = updatedBook.rows[0];
        if (foundBook) {
            res.json(foundBook);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete("/books/:id", async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    try {
        const deleteBook = await query(
            "DELETE FROM books WHERE id = $1",
            [bookId]
        );
        if (deleteBook.rowCount > 0) {
            res.json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
