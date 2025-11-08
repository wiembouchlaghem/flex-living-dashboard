import mongoose from "mongoose";

const startMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");
  } catch (err) {
    console.error("Connexion failed!", err.message);
    process.exit(1);
  }
};

export default startMongoConnection;
