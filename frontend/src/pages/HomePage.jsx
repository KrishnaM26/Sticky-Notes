import NavBar from '../components/NavBar.jsx';
import NoteCard from '../components/NoteCard.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import DatabaseDown from '../components/DatabaseDown.jsx';
import {useState, useEffect} from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";


const HomePage = () => {

	const [notes, setNotes] = useState([]);
	const [loading, setLoading] =  useState(true);
	const [connected, setConnected] = useState();

	const renderBody = () => {
		let bodyMessage = null;
		if(connected && notes.length === 0) {
			bodyMessage = (
			<NotesNotFound />
			);
		}else if (!connected) {
			bodyMessage = (
				<DatabaseDown />
			);
		}
		return(
			bodyMessage
		); 
	}

	useEffect(() => {

		const fetchNotes = async () => {
			try{
				const res = await api.get("/notes");
				console.log(res.data);
				setConnected(true);
				setNotes(res.data);

			}catch(err){
				console.log("Error fetching notes");
				setConnected(false);
		 	}finally{

				setLoading(false);
			}
		};


		fetchNotes();

	}, []) 

	return(

	<div className = "min-h-screen"> <NavBar />
		<div className= "max-2-7xl mx-auto p-4 mt-6">
		{loading && <div className="text-center text-primary py-10">Loading notes...</div>}
		{renderBody()}
		{/*!connected && <DatabaseDown />*/} 
		{/* notes.length === 0 && <NotesNotFound /> */}
		{notes.length > 0 && (
			<div className = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
				{notes.map(note => (
			
					<NoteCard key={note.title} note={note} setNotes={setNotes}/>
				))}
			</div>
		)}
		</div>
	</div>

	);

}

export default HomePage;
