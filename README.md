# CashTracker Backend

This is the backend of CashTracker, an application that provides a REST API for performing operations such as registering, logging in, logging out, adding, updating, deleting, and displaying expenses. It is built using TypeScript, [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).

## Project Architecture

### Server and Database

The server uses Express.js, configured with CORS to allow requests from specific origins, with support for credentials. The database is MongoDB, managed via Mongoose for efficient data connection and manipulation.

### Authentication and Authorization

For authentication and authorization, the application uses [JSON Web Tokens (JWT)](https://github.com/auth0/node-jsonwebtoken). Users receive a token upon registration or login, which they must include in each request as proof of their identity.

### Data Validation

Data validation is handled by [Zod](https://zod.dev/), ensuring that user input meets defined schemas before being processed. This helps prevent errors and improves the security and reliability of the system.

### External Currency Conversion API

The application integrates the external API [DolarApi](https://dolarapi.com/docs/) to obtain the real-time dollar exchange rate. This integration allows expenses to be accurately converted to the local currency, adjusting to the current value of the dollar.

### Deployment

The backend is deployed using [Railway](https://railway.app/), which facilitates access and scalability.

## Requirements

Before starting, make sure to have the following prerequisites installed:

- Node.js: The runtime environment.
- MongoDB: The NoSQL database used for data storage.
  Configuration
  Clone this repository to your local machine:

```bash
git clone https://github.com/tobiasNicolasN/cashTracker-Backend.git

cd cashTracker-Backend
```

Install the project dependencies included in the package.json file:

```bash
npm install
```

Locate the **src/config.js** file in the project and configure the necessary environment variables:

- **PORT**="Specify the port where the application will run."

- **MONGODB_URI**="URL of your MongoDB database."

- **TOKEN_SECRET**="Secret key for JWT tokens."

Make sure to replace MONGODB_URI with your MongoDB database URL and TOKEN_SECRET with a secure key for generating JWT tokens.

## Start the server:

```bash
npm start
```

The server will run on the port specified in the configuration file (the default value is port 3000).

You can use tools like Thunder Client or Postman to make HTTP requests to the API.

## Authentication API Endpoints (AUTH)

### /api/register

HTTP Method: **POST**

Description: Register a new user in the application.

Required permissions: Public.

Request data:

```json
{
  "email": "some@email.com",
  "password": "somePassword"
}
```

### /api/login

HTTP Method: **POST**

Description: Log in to the application.

Required permissions: Registered users.

Request data:

```json
{
  "email": "some@email.com",
  "password": "somePassword"
}
```

### /api/logout

HTTP Method: **POST**

Description: Log out of the application.

Required permissions: Authenticated.

### /api/profile

HTTP Method: **GET**

Description: Displays the authenticated user's data.

Required permissions: Authenticated.

## Expenses API Endpoints

### /api/expenses

HTTP Method: **GET**

Description: Displays the authenticated user's expenses.

Required permissions: Authenticated.

HTTP Method: **POST**

Description: Register a new expense.

Required permissions: Authenticated.

Request data:

```json
{
  "amount": 1234,
  "exchangeRate": "blue-compra",
  "category": "someCategory",
  "detail": "someDetail",
  "date": "0000-00-00T00:00:00Z"
}
```

### /api/expenses/:id

HTTP Method: **GET**

Description: Displays a specific expense.

Required permissions: Authenticated.

HTTP Method: **DELETE**

Description: Deletes an existing expense.

Required permissions: Authenticated.
