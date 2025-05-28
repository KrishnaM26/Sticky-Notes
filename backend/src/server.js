import express from "express";//module
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import {connectDB} from "./config/db.js";
// const express = require('express'); //non module

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

//middleware

//express.json() will allow you to parse json body: req.body
app.use(express.json());

//out custom middle ware
//app.use((req,res,next) => {
//	console.log(`requested ${req.method} & Req URL is ${req.url}`);
//	next();
//});

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log("Connected to Server - Port: ", PORT);
	});
});
