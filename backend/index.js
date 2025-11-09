import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbConnect.js";
import RevRoutes from "./Routes/RevRoutes.js";

dotenv.config(); 

const flexApp = express(); 
flexApp.use(cors());

// DB Connection
connectDB();

// Middleware
flexApp.use(cors()); 
flexApp.use(express.json());
flexApp.use("/api/reviews", RevRoutes); 

// Port
const APP_PORT = process.env.PORT || 4000; 
flexApp.listen(APP_PORT, () =>
  console.log(`FlexApp backend up and running on port ${APP_PORT}`)
);

export default flexApp; 



