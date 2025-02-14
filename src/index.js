import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from 'mongoose';
import router from './routes/index.js'
import search from "./routes/User.js";
import { rateLimit } from "./middleware/redis.js";
dotenv.config();

const app = express();
app.use(rateLimit);
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/api",router);
app.use("/api/search",search);

const PORT= process.env.PORT || "3000";
// console.log(PORT);
mongoose.connect(process.env.MONGO_URL, {
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.log('DB Connection Error:', err));
  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});