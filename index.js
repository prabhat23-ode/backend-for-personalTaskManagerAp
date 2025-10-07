import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors"
import connectDB from "./db/index.db.js";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";
import subTaskRouter from "./routes/subTask.route.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Server Connection Error : ${err.message}`);
  }
});

app.use("/api/v1/taskapp", (req, res)=> {
  res.json({message: "connection stablished with backend"})
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/sub-task", subTaskRouter )
