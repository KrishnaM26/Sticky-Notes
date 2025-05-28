import express from "express";//module
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
import cors from "cors";
// const express = require('express'); //non module

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

//middleware

app.use(cors( 
	{
	origin: "http://localhost:5173",
	}
));

app.use(express.json());

app.use("/api/notes", noteRoutes);


connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connected to Server - Port: ", PORT);
	});
});
