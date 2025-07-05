import mongoose from "mongoose";

const connectDB = async () => {

  // Check if MONGO_URI is set
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not set in environment variables.");
    process.exit(1);
  }

  // Connect to MongoDB
  console.log("🔗 Connecting to MongoDB...");


  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;