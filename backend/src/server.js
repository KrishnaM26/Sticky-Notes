import express from "express";//module
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
// const express = require('express'); //non module

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB();
app.use(express.json());

app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
	console.log("Connected to Server - Port: ", PORT);

});
