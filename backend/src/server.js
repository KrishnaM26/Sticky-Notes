import express from "express"; //module
import noteRoutes from "./routes/noteRoutes.js";
// const express = require('express'); //non module

const app = express()

app.use("/api/notes", noteRoutes);

app.listen(5001, () => {
	console.log("Connected to Server - Port : 5001");

});

