import express from "express";
import { getAllNote, createNote, updateNote, deleteNote, getIdNote } from "../controllers/noteController.js";

const router = express();

router.get("/", getAllNote);
router.get("/:id", getIdNote);  

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;
