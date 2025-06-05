import {Link} from 'react-router';
import {PenSquareIcon, Trash2Icon} from 'lucide-react';
import {formatDate} from '../lib/utils.js';
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const NoteCard = ({note, setNotes}) => {
	
	const handleDelete = async (e, id) => {

		e.preventDefault();
		
		if(!window.confirm(`Are you sure you want to delete '${note.title}'`)) return;

		try{
			await api.delete(`/notes/${id}`); 
			setNotes((prev) => prev.filter(note=>note._id != id));
			toast.success(`'${note.title}' deleted successfully!`);
			return;
		}catch(err){
			toast.error(`Error deleting '${note.title}'`);
		}
	}

	
	return(
	
	<Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-xl transition-all duration-200 w-80 h-80 border-t-10 border-2 border-solid">
		<div className="card-body">
			<h3 className="card-title text-base-content">{note.title}</h3>
			<p className="text-base-content/70 line-clamp-3">{note.content}</p>
			<div className="card-actions justify-between items-center mt-4">
				<span className="text-sm text-base-content/60">
					{formatDate(new Date(note.createdAt))}
				</span>
				<div className="flex item-center gap-1">
						<PenSquareIcon className="size-6" />
					<button className = "btn btn-ghost btn-xs text-error" onClick={ (e)=> handleDelete(e, note._id)}>
						<Trash2Icon className="size-6" />
					</button>
				</div>
			</div>
		</div>

	</Link>

	);
}
	
export default NoteCard;
