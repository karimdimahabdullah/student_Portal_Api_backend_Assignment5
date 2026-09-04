import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoute.js";

//http://localhost:6600  //Url to test the server

const app = express();
dotenv.config();
const port = 6600;


//Connect to MongoDb Atlas
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Connection Error: ", err));

// Middleware to parse JSON bodies
app.use(express.json());

// asyncHandler
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Use the student routes with asyncHandler
app.use("/api", asyncHandler(studentRoutes));

// 404 global error handling middleware  
app.use((req, res, next) => {
  res.status(404).json({ error: `Route ${req.method}${req.url} not found` });
});

//Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
