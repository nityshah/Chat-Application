import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors";
import { app, server } from "./lib/socket.js";

// const app = express(); deleted because socket.js ma banayu che e use karvanu



dotenv.config({});
app.use(express.json());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173",
        "https://chat-application-sigma-teal.vercel.app"
    ],
    credentials: true
}))


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log("Server is running at " + PORT);
    connectDB();
})