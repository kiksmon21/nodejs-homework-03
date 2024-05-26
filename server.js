// CJM ---------->
// const app = require("./app");


// ESM ---------->
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from "./app.js";

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
    console.log("Database connect successful");
  })
  .catch((err) => {
    console.log(`Server not running. Error message ${err.message}`);
  });

