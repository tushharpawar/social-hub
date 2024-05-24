import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  //check for existing connection
  if (connection.isConnected) {
    console.log("Already connected to DB");
    return;
  }

  try {
    //establish new connection to DB

    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log("Connection to DB successful");
  } catch (error) {
    console.error("Failed connecting to DB: ", error);
    process.exit(1);
  }
}
dbConnect();

export default dbConnect;
