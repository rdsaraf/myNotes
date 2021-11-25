import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/Notecontext';

export const Addnote = (props) => {
    const context = useContext(NoteContext);
    const {addnote} = context;
    const [note, setNote] = useState({title : "", description : "", tag : "General"});
    const handleClick = (e)=>{
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        props.showAlert("Note added Succesfully", "success");
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('tag').value = "";
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }
    return (
        <div>
            <h2>Add your notes here :</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Add Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Add description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Add tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}
