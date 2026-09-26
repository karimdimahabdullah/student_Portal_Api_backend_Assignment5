
import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler.js";
import assignmentRoute from "./routes/assignmentRoute.js"
import studentRoutes from "./routes/studentRoute.js"


//http://localhost:6600  //Url to test the server
dotenv.config()


//Connect to MongoDb Atlas
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error: ", err));

const app = express();
const PORT = process.env.PORT || 6600


// Middleware to parse JSON bodies
app.use(express.json());

// asyncHandler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Use the student routes with asyncHandler
app.use('/api', asyncHandler(studentRoutes))
app.use('/assignments', asyncHandler(assignmentRoute));

// 404 global error handling middleware  
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.method}${req.url} not found` });
});

//Global error-handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
