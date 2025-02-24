import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./db/config.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./swagger.js";
import allRoutes from "./routes/allRoutes/index.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(allRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

dbConfig;
