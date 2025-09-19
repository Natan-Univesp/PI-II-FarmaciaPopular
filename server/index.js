const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 3000;
const HOST_IP = "0.0.0.0";


app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.listen(PORT, HOST_IP, () => console.log("rodando"));