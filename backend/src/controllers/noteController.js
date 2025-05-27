export const getAllNotes = (req,res) => {
	res.status(200).send("Note Recieved");
};

export const createNote = (req,res) => {
	res.status(201).json({message: "Note Created"});
};

export const updateNote = (req,res) => {
	res.status(200).json({message: "Note Updated"});
};

export const deleteNote = (req,res) => {
	res.status(200).json({message: "Deleted Note"});
};
