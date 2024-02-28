import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = process.env.DB;
    const URI = process.env.MONGO_URI;

    const connectionInstance = await mongoose.connect(`${URI}/${db}`);
    console.log(
      "mongodb connected DB HOST !!1",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("ERR failed to connect MONGODB ",error);
  }
};

export default connectDB;
