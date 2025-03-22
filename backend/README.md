# Backend Setup (Express.js)

This guide will help you set up the backend on your local machine after cloning the repository.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (if using a local database)

## Installation Steps

### 1. Clone the Repository
```sh
git clone <REPO_URL>
cd <BACKEND_FOLDER>
```

### 2. Install Dependencies
```sh
npm install  # or yarn install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secret_key
```
Adjust the values based on your setup.

### 4. Run the Backend Server
```sh
npm run dev  # Runs with nodemon for live updates
```
OR
```sh
npm start  # Runs the server normally
```

### 5. Accessing the Application
- Open your browser and navigate to `http://localhost:5000` to access the application.

### 6. API Testing
- Use **Postman** or **cURL** to test API endpoints.
- By default, the server runs on `http://localhost:5000`.

## MongoDB Configuration

### Local Setup
To set up MongoDB locally, ensure that you have MongoDB installed and running on your machine. You can download it from the [MongoDB website](https://www.mongodb.com/try/download/community). 

Once installed, you can start the MongoDB server using the following command:
```sh
mongod
```
This will start the server on the default port (27017).

### Hosting MongoDB
If you prefer to host your MongoDB database, you can use services like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). After creating a cluster, you will receive a connection string that you can use in your `.env` file:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```
Replace `<username>`, `<password>`, and `<dbname>` with your actual MongoDB credentials and database name.

## Additional Commands
- **Linting & Formatting**:
  ```sh
  npm run lint
  npm run format
  ```
- **Run Tests**:
  ```sh
  npm test
  ```

---

Your backend should now be up and running!
