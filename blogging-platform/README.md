# Blogging Platform with Database Relationships, Authentication, and Authorization

This is a Node.js web application that implements a CRUD (Create, Read, Update, Delete) blogging platform with user authentication and authorization. The application uses Sequelize as the ORM (Object-Relational Mapping) to interact with a PostgreSQL database.

## How to Set Up and Run the Application

1. Clone the repository from GitHub.
2. Install the required dependencies using npm in your terminal:
npm install express 
npm install pg 
npm install --save sequelize sequelize-cli pg-hstore
npx sequelize-cli init
npm install bcryptjs
npm install dotenv --save-dev

3. Set up the PostgreSQL database. Update the database configuration in config/database.js if necessary.
4. Run the database migrations to create the required tables:
npx sequelize-cli db:migrate
5. Start the Node.js server:
npm start

## Functionality of API Endpoints
Below is a brief explanation of the functionality of each API endpoint:

1. User Registration and Login Endpoints:

- `POST /api/register`: Register a new user with a username, email, and password.
- `POST /api/login`: Authenticate the user with username and password, and create a session cookie upon successful login.

2. CRUD Operations for Posts:

- `POST /api/posts`: Create a new post with the provided title and content.
- `GET /api/posts`: Retrieve all posts.
- `GET /api/posts/:postId`: Retrieve a specific post by its ID.
- `PUT /api/posts/:postId`: Update a post's title and content.
- `DELETE /api/posts/:postId`: Delete a post.

3. CRUD Operations for Comments:

- `POST /api/posts/:postId/comments`: Create a new comment for a specific post.
- `GET /api/posts/:postId/comments`: Retrieve all comments for a specific post.
- `GET /api/comments/:commentId`: Retrieve a specific comment by its ID.
- `PUT /api/comments/:commentId`: Update a comment's content.
- `DELETE /api/comments/:commentId`: Delete a comment.

## Testing
Testing the application can be done using Postman or any other API testing tool.