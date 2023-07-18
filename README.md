## Instagram-like User Info and Login System

This project aims to develop a full-stack user info and login system with functionality similar to Instagram. The system will utilize HTML, tailwind CSS, JavaScript, and React JS for the front-end, while the back-end will be implemented using Express.js and MongoDB.

### Front-End Development

- Design a visually appealing user interface using HTML, Tailwind CSS, JavaScript and React JS.
- Develop an intuitive user registration form to capture essential details like username, email, password, bio, and name.
- Create a login form to authenticate users and verify their credentials.

### Back-End Development

- Handle HTTP requests and responses using Express.js.
- Set up a secure MongoDB database to store user information.
- Implement user registration functionality by validating and saving user data to the database.
- Develop a login mechanism to verify user credentials against the stored data.
- Generate a JWT token and store it in the session storage.

### Security

- Enhance security by hashing and salting user passwords before storing them in the database.
- Protect sensitive routes to ensure only authenticated users can access them.

### Backend API Routes

- `/signup`: Create a sign-up route that accepts `{ name, username, bio, email, password }` as a response, hash the password, and store the data in the database.
- `signupDataValidate`: Middleware that checks if the user has provided the required data and sends a response accordingly.
- `/login`: Create a login route that accepts `{ user, password }` as a response, generates a JWT token, sets it in a cookie, and responds with a success message.
- `loginDataValidate`: Middleware that checks if the user has provided the required data and sends a response accordingly.
- `/`: Create a home route that authenticates the user (use the `authenticateUser` middleware) and sends the user data.
- `authenticateUser`: Middleware that verifies the token provided by the user through the cache and proceeds based on the output.

### Frontend Pages

- **Sign Up Page**: Create a sign-up page. After successful signup, redirect the user to the login page.
- **Login Page**: Build a login page. After successful login, redirect the user to the user page.
- **User Page**: Create a user page with a demo image and fetch the remaining user data from the server by authenticating the user.
