import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import RevRoutes from "./Routes/RevRoutes.js";

dotenv.config(); 

const flexApp = express(); 
flexApp.use(cors());
flexApp.use(express.json());

// DB Connection
connectDB();

// Test root endpoint
flexApp.get("/", (req, res) => {
  res.send("Flex Living Backend is running!");
});

// API routes
flexApp.use("/api/reviews", RevRoutes); 

// Port
const APP_PORT = process.env.PORT || 4000; 
flexApp.listen(APP_PORT, () =>
  console.log(`FlexApp backend up and running on port ${APP_PORT}`)
);

export default flexApp;
