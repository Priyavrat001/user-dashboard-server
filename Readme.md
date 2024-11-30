# API Server

This is an API server built using **Node.js** and **Express.js**. The API provides secure endpoints for user authentication and data management with features like password hashing, JWT authentication, and cookie handling. It also connects to a MongoDB database for data persistence.

## Features

- **User Authentication**: Secure user login and registration with password hashing using `bcryptjs` and JWT-based authentication.
- **Cookie Management**: `cookie` and `cookie-parser` are used for managing cookies, such as storing JWT tokens in a secure manner.
- **Cross-Origin Resource Sharing (CORS)**: Enabled using the `cors` library to allow requests from different origins.
- **Environment Variables**: Managed via `dotenv` to configure sensitive information like database connection strings and JWT secrets.
- **MongoDB Integration**: Connected to a MongoDB database using `mongoose` for schema management and database operations.

## Libraries Used

- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used to build API endpoints.
- **bcryptjs**: Used to hash and securely store passwords for user authentication.
- **cookie**: Utility for setting and parsing cookies in the API responses.
- **cookie-parser**: Middleware to parse cookies from client requests.
- **cors**: Enables Cross-Origin Resource Sharing (CORS) to allow requests from other domains.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **jsonwebtoken**: Used for creating and verifying JSON Web Tokens (JWT) for secure user authentication.
- **mongodb**: MongoDB driver to directly interact with the MongoDB database.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, managing the data schema and database operations.
- **nodemon**: A utility that automatically restarts the server when file changes are detected, used in development for a better workflow.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A MongoDB instance or Atlas cluster for database connectivity.
