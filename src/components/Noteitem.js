import React, { useContext } from 'react'
import NoteContext from '../context/notes/Notecontext';

export const Noteitem = (props) => {
    const context = useContext(NoteContext);
    const { delnote } = context;

    const { note, updateNote } = props;
    return (
        <div className="col-md-3 my-2">
            <div className="card">
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success">
                #{note.tag}
            </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <span title="Delete note"><i className="fas fa-trash-alt mx-2" style={{ cursor: 'pointer', }} onClick={() => { delnote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i></span>
                    <span title="Edit note"><i className="fas fa-edit mx-2" style={{ cursor: 'pointer' }} onClick={() => { updateNote(note) }}></i></span>
                </div>
            </div>
        </div>
    )
}
