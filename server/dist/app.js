import express from "express";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import colors from "colors";
const clrs = colors;
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use("/api/auth", router);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ....`.blue.underline);
});
