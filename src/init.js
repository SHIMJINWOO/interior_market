//import "regenerator-runtime";
//import "dotenv/config";
import "./db/db.js";
import "./models/Review.js";
//import "./models/User.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);