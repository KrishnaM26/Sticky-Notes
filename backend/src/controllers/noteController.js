import Note from "../models/Note.js";

export async function getAllNote(req,res){
	try{
		const notes = await Note.find().sort({createdAt: -1});
		res.status(200).json(notes);
	}catch(error){
		console.error("Error in getAllNotes function.", error);
		res.status(500).json({message: "Internal Server Error"});
	}
};

export async function getIdNote(req, res){
	try{
		const getNotes = await Note.findById(req.params.id);
		if(!getNotes) return res.status(404).json({message: "404 Note Not Found"});

		res.status(200).json(getNotes);
	}catch(error){
		res.status(500).json({message: "Error in getIdNote Controller"});
	}

};

export async function createNote(req,res){
	try{
		const {title, content} = res.body;
		const newNote = new Note({title, content});
		const savedNote = await newNote.save();
		res.status(201).json(savedNote);
	}catch(error){
		
		res.status(500).json({message: "Error in CreateNote controller"});

	}
};

export async function updateNote(req,res){
	try{
		const{title, content} = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id, 
			{title,content}, 
			{
				new:true,
			});
		if(!updatedNote) return res.status(404).json({message: "404  Note not found"});
		res.status(200).json({message: "Note Updated"});

	}catch(error){
		res.status(500).json({message: "Error in updateNote controller"});
	}
};

export async function deleteNote(req,res){
	try{
		const deleteNote = await Note.findByIdAndDelete(req.param.id);
		if (!deleteNote) return res.status(404).json({message: "404 Note Not Found"});

		res.status(200).json({message: "Deleted Note"});
	}catch(error){
		res.status(500).json({message: "Error in deleteNote Controller"});
	}
};
