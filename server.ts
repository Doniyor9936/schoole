import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import studentRouter  from "./router/studentRouter";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(userRouter)
app.use(studentRouter)

app.listen(PORT, () => {
  console.log(`server running:${PORT}`);
});
