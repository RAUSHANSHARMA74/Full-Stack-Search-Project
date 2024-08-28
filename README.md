# Full-Stack-Search-Project

Got it! Here’s a single, comprehensive README.md file that includes all the instructions for both the backend and frontend setup, along with cloning the repository, installing dependencies, setting up the environment, and running the project:

markdown
Copy code

# CSV Upload and Table Display Project

This project consists of two parts:

1. **Backend**: A Node.js/Express server.
2. **Frontend**: A React application displaying the data in a responsive table.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- **Git**

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RAUSHANSHARMA74/Full-Stack-Search-Project.git
```

2. Navigate to the project directory:

   ```bash
   cd Full-Stack-Search-Project
   ```

# Your Project Name

## Backend Setup

1. **Navigate to the Backend Directory:**

   - Open your terminal or command prompt.
   - Change the working directory to the backend folder:
     ```bash
     cd backend
     ```

2. **Create an Environment File (`.env`):**

   - In your backend root folder, create a file named `.env`. This file will store environment variables specific to your application:
     ```bash
     touch .env
     ```

3. **Add Environment Variables to `.env`:**

   - Open the `.env` file in a text editor.
   - Add the necessary environment variables for your application. These might include database connection strings, API keys, or any other configuration values. For example:
     `     
`
     `bash
           MONGODB_URL = mongodb+srv://<name>:<password>@test.xhwertd.mongodb.net/databasename
           JWT_SECRET = secret
           EMAIL = Add your gmail
           EMAIL_PASSWORD = Add your gmail app password you can create from heare (link) [Email_password](https://myaccount.google.com/apppasswords?rapt=AEjHL4MYKmV0F-jWyoE2FslJFVVhniY5o5cW8pnxXSV4SabpQbwlRqrl-Q6Rh73vY7U6fKCcVo0O15_-TqvjlWBYRigNJz6Ck-zt1JYG04o4X_IefJGs51A&pli=1)
           FRONTEND_URL = http://localhost:3000
     `

4. **Install Dependencies:**

   - Install the required Node.js dependencies for your project. Run the following command in the terminal:
     ```bash
     npm install
     ```

5. **Running the Backend:**

   - To start your backend server, use the following command:
     ```bash
     npm start
     ```
   - By default, the backend server will run on `http://localhost:3050`. You can specify a different port by setting it in your `.env` file.

## Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env` file in the `frontend` directory and add the following environment variable:

     ```env
     REACT_APP_BACKEND_URL=http://localhost:3050
     ```

   - Replace `http://localhost:3050` with the URL of your backend server if different.

4. Running the Frontend:

   - Start the frontend application:

     ```bash
     npm start
     ```

   - The frontend application will run on `http://localhost:3000` by default.

## Additional Notes

- Ensure that MongoDB is running and accessible from the backend server.
- Make sure to set up the environment variables correctly to avoid connection issues.
- The frontend application expects the backend to be running on the URL specified in the `.env` file.

If you encounter any issues, please check the error messages for guidance or consult the documentation for the respective technologies used.
