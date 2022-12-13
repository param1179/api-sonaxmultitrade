import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config";

export const connect = () => {
  var username = encodeURIComponent(config.DB_USERNAME);
  var password = encodeURIComponent(config.DB_PASSWORD);
  const URI = `mongodb+srv://${username}:${password}@sonaxmultitrade.sxouqhc.mongodb.net/${config.DATABASE}`;
  mongoose.set("strictQuery", true);
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
  const connection = mongoose.connection;
  connection.once("open", (err) => {
    if (err) throw err;
    console.log("MongoDB database connection established successfully");
  });
};
