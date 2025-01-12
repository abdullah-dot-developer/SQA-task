import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "DataBase Connected Successfully: ",
      connection.connection.host
    );
  } catch (error) {
    console.log("Error occured in Connecting Database!", error);
  }
};

export default dbConnect;
