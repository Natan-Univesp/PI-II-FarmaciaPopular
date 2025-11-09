const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnectionTest } = require("./src/test/dbConnectionTest.js");
const Routes = require("./src/routes/index.js");

dotenv.config();

const allowedOrigins = [
   "http://localhost:5173",
   "https://pi-farmacia-popular.netlify.app"
]

const corsOptions = {
   origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
         callback(null, true); // Origin is allowed
      } else {
         callback(new Error("Not allowed by CORS")); // Origin is not allowed
      }
   },
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
   allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
   credentials: true, // Include credentials (optional)
   optionsSuccessStatus: 204, // For legacy browser support
};

const app = express();
const PORT = 3000;
const HOST_IP = process.env.IP_FIXED || "0.0.0.0";

dbConnectionTest();
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(Routes);
app.listen(PORT, HOST_IP, () => console.log("rodando"));
