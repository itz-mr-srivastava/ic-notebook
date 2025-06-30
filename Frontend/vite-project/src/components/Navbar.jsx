import React from 'react';
import './Navbar.css';

const Navbar = ({ darkMode, setDarkMode, handleLogout }) => (
    <nav className="navbar">
        <h2>📝 ic-notebook</h2>
        <div className="navbar-actions">
            <button className="btn logout" onClick={handleLogout}>Logout</button>
            <button className="btn theme-toggle" onClick={() => {
                setDarkMode(prev => {
                    const newMode = !prev;
                    document.body.classList.toggle('dark-mode', newMode);
                    return newMode;
                });
            }}>
                {darkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
        </div>
    </nav>
);

export default Navbar;
