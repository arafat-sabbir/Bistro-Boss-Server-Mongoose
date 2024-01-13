const mongoose = require("mongoose");
require("dotenv").config();

const getConnectionString = () => {
  let connectionUrl;
  if (process.env.NODE_ENV === "development") {
    connectionUrl = process.env.DB_LOCAL;
    connectionUrl = connectionUrl.replace("<username>", process.env.DB_USER);
    connectionUrl = connectionUrl.replace(
      "<password>",
      process.env.DB_PASSWORD
    );
  } else {
    connectionUrl = process.env.DB_PRODUCTION;
  }

  return connectionUrl;
};
const connectDB = async () => {
  const uri = getConnectionString();
  await mongoose.connect(uri);
  console.log("connected To Mongodb Successfully");
};

module.exports = connectDB;
