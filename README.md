# Express.js Authentication API with Redis Caching

This project is a user authentication system built with **Express.js**, **MongoDB**, **Redis**, and **PM2**. It supports user registration, login, and user search, with Redis caching for optimized query performance and PM2 for process management.

## Features

- **User Registration**: Store user credentials securely with bcrypt.
- **User Login**: Authenticate users with JWT.
- **Search User**: Find users by email or username.
- **Redis Caching**: Cache database queries to improve performance.
- **PM2 Support**: Process management for better scalability and monitoring.

## Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & bcrypt
- **Caching**: Redis
- **Process Management**: PM2

## Installation

1. Clone the repository:

   ```sh
   git clone git@github.com:SagarKapoorin/User.git
   cd User
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following:

   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   redis_Url=redis://127.0.0.1:6379
   ```

4. Start Redis server (if not running):

   ```sh
   redis-server
   ```

5. Run the server:

   ```sh
   npm start
   ```

6. To run with PM2:

   ```sh
   pm2 start src/index.js -i max --no-daemon
   ```

## API Endpoints

### **User Registration**

- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepassword",
    "fullName": "John Doe",
    "gender": "Male",
    "dateOfBirth": "1990-09-22",
    "country": "USA"
  }
  ```

### **User Login**

- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securepassword"
  }
  ```

### **Search User** (Requires Authentication)

- **GET** `/api/users/search?query=john@example.com`

## Running with PM2

To keep the server running in the background:

```sh
npm install -g pm2
npm run start
```

To stop the server:

```sh
npm run stop
```

## Source Code Structure
The source code is located in the `src` folder.

## Author

Made by **Sagar Kapoor**

## License

This project is open-source and available under the MIT License.

