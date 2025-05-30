import {useNavigate, useParams, Link} from 'react-router';
import {useState, useEffect} from 'react';
import {LoaderIcon, ArrowLeftIcon, Trash2Icon} from 'lucide-react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {


	const [note,setNote] = useState(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const navigate = useNavigate();

	const {id} = useParams();

	console.log({id});

	useEffect(() => {

		const fetchNode = async () => {

			try{

				const res = await api.get(`/notes/${id}`);
				setNote(res.data);

			}catch(err){

				console.log("error loading note");
				toast.error("Failed to fetch note");
			}finally{


				setLoading(false);

			}

		}

		fetchNode();

	}, [id]);
	
	const handleDelete = async () => {
	
		
		if(!window.confirm(`Are you sure you want to delete '${note.title}'`)) return;

		try{
			await api.delete(`/notes/${id}`);
			navigate("/");
			toast.success("Note Deleted");
			return;
		}catch(err){
			
			console.log("Error deleting note");

		}
	}	

	
	const handleSave = async (e) => {
		e.preventDefault();

		if(!note.title.trim() || !note.content.trim()){

			toast.error("All Fields are Required!");
			return;
		}

		setSaving(true);
		try{
			await api.put(`/notes/${id}`, note)
			navigate("/");
			toast.success("Updated Note");


		}catch(err){

			console.log("Error Updating Note");

		}finally{

			setSaving(false);

		}




	};

	if(loading){

		return(
			<div className = " bg-base-200 flex items-center min-h-screen w-full justify-center">
				<LoaderIcon className="animate-spin size-10" />
			</div>
		)
	}


	return(
			
		<div className = "min-h-screen bg-base-200">
			<div className = "container mc-auto px-4 py-6">
				<div className = "max-w-2xl mx-auto">
				<div className="flex items-center justify-between mb-6">

					<Link to={"/"} className ="btn btn-ghost mb-5">
						<ArrowLeftIcon className = "h-5 w-5" /> 
						Back To Notes
					</Link>
					<button onClick={handleDelete} className = "btn btn-error btn-outline">
						<Trash2Icon className = "h-5 w-5" />
						Delete Note
					</button>
				</div>


				<div className="card bg-base-100"> 
					<div className = "card-body"> 
						<h1 className = "card-title text-2xl mb-4"> 
							Edit Note
						</h1>

							<div className = "form-control mb-4"> 
								<label className='label pb-2'> 
									Title
								</label>
								<br />
								<input
									type="text"
									value = {note.title}
									className = "input input-primary w-full"
									onChange={(e) => setNote({...note, title: e.target.value})}
								/>	
							</div>
							<div className="form-control mb-4"> 

								<label className='label pb-2'>
									Content
								</label>
								<br /> 
								<textarea
									type="text"
									value={note.content}
									className = "textarea textarea-primary w-full h-30"
									onChange = {(e) => setNote({...note, content: e.target.value})}
								/>
			
							</div>

							<div className = "card-actions justify-end">

								<button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>{saving ? "Saving..." : "Save Note"}</button> 

							</div>


						
					</div>
				</div>
				</div>
			</div>
		</div>

	)



};

export default NoteDetailPage;
