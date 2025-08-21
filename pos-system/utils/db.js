import mongoose from "mongoose";

export const connect = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined. Please check your .env file.");
    }

    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      // Add connection options for better reliability
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("Connecting to MongoDB successful!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error(`Error connecting to MongoDB: ${error.message}`);
  }
};
