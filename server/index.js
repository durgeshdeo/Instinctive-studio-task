import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  methods: ["POST", "GET"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
