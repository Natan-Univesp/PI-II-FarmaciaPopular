const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const { dbConnectionTest } = require("./src/test/dbConnectionTest.js");
const Routes = require("./src/routes/index.js");

dotenv.config();

const app = express();
const PORT = 3000;
const HOST_IP = process.env.IP_FIXED || "0.0.0.0";

dbConnectionTest();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(Routes);
app.listen(PORT, HOST_IP, () => console.log("rodando"));