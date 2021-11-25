import React, { useState } from 'react'
import NoteContext from './Notecontext'

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);
    //Get all notes
    const getnote = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }
    //Adding notes
    const addnote = async (title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }
    //deleting notes
    const delnote = async (id)=>{
        const response = await fetch(`${host}/api/notes/delnote/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        const newNote = notes.filter((note)=>{return note._id!==id});
        setNotes(newNote);
    }
    //editing notes
    const editnote = async (id, title, description, tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, delnote, editnote, getnote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;