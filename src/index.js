import app from './app.js'
import { sequelize } from "./database/database.js";
import {PORT} from './config.js'

async function main() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      app.listen(PORT);
      console.log("Server on port", PORT);
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  
  main();