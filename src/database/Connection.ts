import mongoose from "mongoose";

export default async function Connection() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/stock"
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}
