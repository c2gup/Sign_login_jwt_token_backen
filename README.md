# SingLogIN Backend

This repository contains the backend code for the SingLogIN application, a simple authentication API.

## Description

SingLogIN is a backend API that provides authentication functionalities such as user signup and login. It allows users to create accounts and authenticate themselves to access protected resources within an application.

## Usage

### Base URL

The base URL for all endpoints is: `http://localhost:4000/api/v1`

### Endpoints

#### Signup

- **Endpoint:** `POST /signup`
- **Description:** Creates a new user account.
- **Body:**
   ```json 
     {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "your_password",
      "role": "Student"
  }
  
#### Login

- **Endpoint:** `POST /login`
- **Description:** Logs in an existing user.
- **Body:** Outside of the README file.
  ```json
      {
        "email": "john@example.com",
         "password": "your_password"
      }


### JWT (JSON Web Tokens)

SingLogIN uses JWT for authentication. After successful login, the server responds with a JWT token, which should be included in the Authorization header for accessing protected routes.

### Environment Variables

To run the server, you need to set up the following environment variables. Create a `.env` file in the root directory with the following content:

PORT=4000
MONGODB_URL=<your MongoDB connection string>
JWT_SECRET=<your JWT secret key>


## How to Use

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up environment variables by creating a `.env` file in the root directory with the content mentioned above.
4. Start the server using `npm start`.
5. Use the provided Postman URLs to interact with the API endpoints.

### Postman URL

Replace `your_postman_collection_url` with the actual URL of your Postman collection containing the endpoints for this API.




