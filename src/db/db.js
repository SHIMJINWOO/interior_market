// src/db/database.js
import mongoose from "mongoose";

const connection = mongoose.connect("mongodb://127.0.0.1:27017/interior_market",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/*
//const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.getConnection((err) => {
  
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

export default connection;
*/
const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError);
db.once("open" ,handleOpen)