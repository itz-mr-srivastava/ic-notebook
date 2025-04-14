

import React, { useState } from 'react'
import NoteContext from './noteContext'
import { useNavigate } from 'react-router-dom'

function NoteState(props) {
    let navigate = useNavigate();
    const host = "http://localhost:5000"
    const initialnotes = []
    const [notes, setnotes] = useState(initialnotes); //ye ek notes states hain jisko initialize ek initialnotes naam ke array se kiya hain.

    // const getNotes = async () => {
    //     //api call
    //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         }
    //     });
    //     const result = await response.json();np
    //     console.log(result);
    //     setnotes(result);
    // }
    const getNotes = async () => {
        const authToken = localStorage.getItem('token');

        if (!authToken) {
            console.log(" No token found in localStorage. Redirecting to login...");
            navigate('/login');
            return;
        }

        try {
            // API Call
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'auth-token'
                }
            });

            const result = await response.json();

            if (!response.ok) {
                console.log(" Error fetching notes:", result.error);
                return;
            }

            console.log("Fetched Notes:", result);
            setnotes(result);
        } catch (error) {
            console.log(" Network error while fetching notes:", error.message);
        }
    };


    //add a note
    const addnote = async (title, description, tag) => {
        //todo api call
        // const notetobeadded = {
        //   "_id": "673c6c3e77205985d61d4ec56",
        //   "user": "673c6b8d77205985d61d4eba",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2024-11-19T10:45:18.775Z",
        //   "__v": 0
        // }
        // setnotes(notes.concat(notetobeadded));  //notes state jo ki ek array hain usme notetobeadded ko concat kiya hain

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const notetobeadded = await response.json();
        setnotes(notes.concat(notetobeadded));
    }
    //Delete a Note
    const deletenote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        console.log("Deleting the note with id" + id);
        const newnote = notes.filter((e) => { return e._id != id }); //iska mtlb ye hain ki notes array se vo note-s filter karke lao jin note ki _id parameter vali id se match na karti ho kyunki parameter vale id ke note ko to hatana hi hain
        setnotes(newnote); //filter hue notes ko newnote naam ke array me store kar diya tha , jise fir setnotes state mein dal diya
    }
    //Edit a Note
    const editnote = async (id, title, description, tag) => {
        try {
            // API Call
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Error updating note:", error);
                return;
            }

            const json = await response.json();
            console.log("Updated Note:", json);

            // Update the notes state
            const updatedNotes = notes.map((note) =>
                note._id === id ? { ...note, title, description, tag } : note
            );
            setnotes(updatedNotes);
        } catch (error) {
            console.log("Error while updating note:", error.message);
        }
    };


    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState
