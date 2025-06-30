import React from 'react';

const NoteForm = ({ form, setForm, handleSave, handleVoiceInput, handleUpdate, editing }) => (
    <div className="note-form">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <div className="note-form-controls">
            <button className="btn voice" onClick={handleVoiceInput}>🎙️ Voice</button>
            <input placeholder="Tags (comma separated)" value={form.tags.join(', ')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',') })} />
            <label className="pin-checkbox">
                <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} />
                Pin
            </label>
        </div>
        <button className="btn save" onClick={editing ? handleUpdate : handleSave}>{editing ? 'Update' : 'Save'}</button>
    </div>
);

export default NoteForm;
