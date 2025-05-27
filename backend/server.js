import express from "express"; //module
// const express = require('express'); //non module

const app = express()

app.get("/api/notes", (req, res) => {
	res.send("you have 5 notes");
});

app.listen(5001, () => {
	console.log("Connected to Server - Port : 5001");

});

