import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
