# CashTracker Backend
This is the backend of CashTracker, an application that provides a REST API for operations such as register, login, logout, upload, update, delete, and display expenses. It is built using Node.js, Express, and MongoDB.

## Requirements
Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/en): The runtime environment.
- [MongoDB](https://www.mongodb.com/): The NoSQL database used for data storage.

## Configuration

1. Clone this repository to your local machine:

  `git clone https://github.com/tobiasNicolasN/cashTracker-Backend.git`
  
  `cd cashTracker-Backend`

2. Install project dependencies:
   
The dependencies used in this project are included in "package.json":

To install these dependencies, run:

  `npm install`

3. Locate the 'src/config.js' file in the project and configure the necessary environment variables:
   
  `PORT = 3000`

  `MONGODB_URI = "URL of your mongodb database"`

  `TOKEN_SECRET = "Your secret key for token"`

Make sure to replace MONGODB_URI with the URL of your MongoDB database and TOKEN_SECRET with a secure key for JWT token generation.

## Usage

1. Start the server:
  
  `npm start`

The server will run on the port specified in the config.js file (default is port 3000).

You can use tools like [Thunder Client](https://www.thunderclient.com/) to make HTTP requests to the API.

## API Endpoints

### EndPoint: /api/register

- HTTP Method: `POST`
- Description: Register in the application.
- Required Permissions: Public.
- Request Data Structure:
  - JSON Object:
  
  `{
    "username" : "someUsername",
    "email" : "some@email.com",
    "password" : "somePassword"
  }`
  
  - username: string(at least 4 characters)
  - email: string
  - password: string(at least 8 characters)

### EndPoint: /api/login

- HTTP Method: `POST`
- Description: Log-in to the application.
- Required Permissions: Registered users.
- Request Data Structure:
  - JSON Object:
  
  `{
    "email" : "some@email.com",
    "password" : "somePassword"
  }`
  
  - email: string
  - password: string
    
### EndPoint: /api/logout

- HTTP Method: `POST`
- Description: Log-out to the application.
- Required Permissions: Authenticated.

### EndPoint: /api/profile

- HTTP Method: `GET`
- Description: Display user data.
- Required Permissions: Authenticated.

### EndPoint: /api/expenses

- HTTP Method: `GET`
- Description: Display expenses.
- Required Permissions: Authenticated.

- HTTP Method: `POST`
- Description: Upload expense.
- Required Permissions: Authenticated.
- Request Data Structure:
  - JSON Object:
  
  `{
    "amount" : 1234,
    "category" : "someCategory",
    "detail" : "someDetail",
    "date" : "0000-00-00T00:00:00Z"
  }`

  - amount: number
  - category: string
  - detail: string(optional)
  - date: string(Date Format - optional)

### EndPoint: /api/expenses/id

- HTTP Method: `GET`
- Description: Display expense.
- Required Permissions: Authenticated.
    
- HTTP Method: `PUT`
- Description: Update expense.
- Required Permissions: Authenticated.
- Request Data Structure:
  - JSON Object:
  
  `{
    "amount" : 1234,
    "category" : "someCategory",
    "detail" : "someDetail",
    "date" : "0000-00-00T00:00:00Z"
  }`

  - amount: number
  - category: string
  - detail: string(optional)
  - date: string(Date Format - optional)
    
- HTTP Method: `DELETE`
- Description: Delete expense.
- Required Permissions: Authenticated.
