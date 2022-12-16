import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import colors from "colors";
import errorHandler from "./middleware/Error.js";
import privateRouter from "./routes/private.js";
import connectDB from "./config/db.js";
const clrs = colors;
dotenv.config();
connectDB();
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const PORT = process.env.PORT || 8000;
app.use("/api/auth", userRouter);
app.use("/api/private", privateRouter);
// Error handler (Should be last piece of middleware)
app.use(errorHandler);
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ....`.blue.underline);
});
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
