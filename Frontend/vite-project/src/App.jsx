import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';
import './App.css';

const API = 'http://localhost:5000/api/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', tags: [], pinned: false });
  const [editing, setEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLogin, setIsLogin] = useState(true);

  const fetchNotes = async () => {
    const res = await axios.get(`${API}?page=${page}`, { headers: { Authorization: token } });
    setNotes(res.data);
  };

  const handleSave = async () => {
    await axios.post(API, form, { headers: { Authorization: token } });
    resetForm();
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm(note);
    setEditing(true);
    setNoteId(note._id);
  };

  const handleUpdate = async () => {
    await axios.put(`${API}/${noteId}`, form, { headers: { Authorization: token } });
    resetForm();
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`, { headers: { Authorization: token } });
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setForm(prev => ({ ...prev, content: prev.content + ' ' + speech }));
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition failed: " + event.error);
    };

    recognition.start();
  };

  const resetForm = () => {
    setForm({ title: '', content: '', tags: [], pinned: false });
    setEditing(false);
    setNoteId(null);
  };

  useEffect(() => {
    if (token) fetchNotes();
  }, [page, token]);

  if (!token) return (
    <div className="auth-container">
      {isLogin ? (
        <>
          <Login setToken={setToken} />
          <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Register</button></p>
        </>
      ) : (
        <>
          <Register />
          <p>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></p>
        </>
      )}
    </div>
  );

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} handleLogout={handleLogout} />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <NoteForm
        form={form}
        setForm={setForm}
        handleSave={handleSave}
        handleVoiceInput={handleVoiceInput}
        handleUpdate={handleUpdate}
        editing={editing}
      />
      <NoteList
        notes={notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()))}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <div className="pagination-controls">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default App;
