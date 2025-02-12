import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deletenote } = context;
    const { note, updateNote } = props;

    return (
        <div className="col-md-6">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fas fa-trash mx-2" onClick={() => { deletenote(note._id) }}></i>
                        <i className="fas fa-edit mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text" style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                        {note.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem;
