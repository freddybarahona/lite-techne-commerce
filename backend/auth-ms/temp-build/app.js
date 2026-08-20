import express from 'express';
import cors from "cors";
import authRouter from "./src/adapters/routes/authRoutes";
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
//registro de rutas
app.use("/auth", authRouter);
export default app;
