# Assignment: Building a Book Inventory Management API

## Objective: Create a Book Inventory Management API using Node.js, Express.js, and PostgreSQL to perform CRUD operations on book data.

### Instructions:

Set up a Node.js project with Express.js and PostgreSQL.

1. Initialize a new Node.js project using npm or yarn.
2. Install the necessary dependencies such as Express.js and the PostgreSQL library (pg).
3. Set up a basic Express.js server.

Create a PostgreSQL database and set up the necessary tables.

1. Using the psql command-line utility or a database management tool like DBeaver or pgAdmin, create a new PostgreSQL database for the book inventory management.
2. Design the necessary tables to store book data. For example, you can have a table named books with columns such as id, title, author, genre, and quantity. Be mindful of the data types and constraints when creating the tables.

Implement the API endpoints to perform CRUD operations on books.

1. Set up the necessary Express.js routes and handlers to handle CRUD operations.
2. Create a route to retrieve all books from the database (GET /books).
3. Create a route to retrieve a specific book by ID from the database (GET /books/:id).
4. Create a route to add a new book to the database (POST /books).
5. Create a route to update a book by ID in the database (PATCH /books/:id).
6. Create a route to delete a book by ID from the database (DELETE /books/:id).
7. Use SQL queries to interact with the PostgreSQL database and perform the necessary CRUD operations.

Test the API endpoints using Postman.

1. Use Postman or any API testing tool to send requests to the API endpoints. (add screenshots in the repo README of your successful API calls)
2. Test each endpoint (GET, POST, PATCH, DELETE) with different scenarios to ensure they function correctly.
3. Verify that the API endpoints are correctly interacting with the PostgreSQL database and returning the expected results.

## Get all books
![image](https://github.com/khadillacs/TTP-Assignments/assets/52975594/5fb64c34-250e-4bb9-8793-40e33291cacf)

## Get a specific book
![image](https://github.com/khadillacs/TTP-Assignments/assets/52975594/f8410270-e9bb-44ff-9003-a4cf06c1806d)

## Add a book
![image](https://github.com/khadillacs/TTP-Assignments/assets/52975594/8781acba-d131-47bf-b92d-a091b7663aca)

## Updating a book
![image](https://github.com/khadillacs/TTP-Assignments/assets/52975594/08ce5538-c5b6-401c-8e2b-f3df5538c0a6)

## Delete a book
![image](https://github.com/khadillacs/TTP-Assignments/assets/52975594/27d18bc9-1f6a-4bab-9617-24100348d98c)
  
### Deliverable:

- A Node.js and Express.js application with the PostgreSQL database connection established.
- The "books" table created in the PostgreSQL database.
- CRUD routes implemented for the bookstore inventory API.
- Successful test results from Postman, including valid request responses.
