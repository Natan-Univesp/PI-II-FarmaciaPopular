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

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true); // Origin is allowed
      } else {
         callback(new Error("Not allowed by CORS")); // Origin is not allowed
      }
   },
   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow specific methods
   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Specify allowed headers
   credentials: true, // Include credentials (optional)
   optionsSuccessStatus: 204, // For legacy browser support
};

const app = express();
const PORT = 3000;
const HOST_IP = process.env.IP_FIXED || "0.0.0.0";

dbConnectionTest();

app.use((req, res, next) => {
   console.log('=== REQUEST INFO ===');
   console.log('Method:', req.method);
   console.log('Path:', req.path);
   console.log('Origin:', req.headers.origin);
   console.log('Headers:', req.headers);
   next();
});

app.use(cors(corsOptions));

app.use((req, res, next) => {
   if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.status(200).end();
   }
   next();
});

app.use(express.json());
app.use(express.static("public"));
app.use(Routes);
app.listen(PORT, HOST_IP, () => console.log("rodando"));
