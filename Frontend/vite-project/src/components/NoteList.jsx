import React from 'react';

const NoteList = ({ notes, handleEdit, handleDelete }) => (
    <div>
        {notes.map(note => (
            <div key={note._id} className="note">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <small>Tags: {note.tags.join(', ')}</small>
                <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(note)}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(note._id)}>🗑️ Delete</button>
                </div>
            </div>
        ))}
    </div>
);

export default NoteList;
