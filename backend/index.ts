import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", router);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
