import React, { useState, useEffect } from 'react';
import axios from 'axios'; //I imported axios so we can make HTTP requests to our backend. This is the "bridge" tool that connects frontend to backend
import './App.css'; // Import our clean CSS styles

function App() {
  // STATE - Data your app remembers
  const [notes, setNotes] = useState([]); //useState: React's way of remembering data
                                          //notes: Array that holds all your notes
  const [inputText, setInputText] = useState(''); //inputText: String that holds what's currently in the input field
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(''); // Error messages for user

  // API BASE URL
  const API_BASE_URL = 'http://localhost:3001/api';

  // FETCH ALL NOTES FROM BACKEND
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      console.log('🔄 Fetching notes from backend...');
      
      const response = await axios.get(`${API_BASE_URL}/notes`);
      console.log('✅ Notes received from backend:', response.data);
      
      setNotes(response.data); // Update state with backend data
    } catch (err) {
      console.error('❌ Error fetching notes:', err);
      setError('Failed to load notes. Make sure backend is running on port 3001.');
    } finally {
      setLoading(false); // Always stop loading, success or failure
    }
  };

  // This runs when the app starts - now fetches real data!
  useEffect(() => {
    console.log('🚀 App started - fetching notes from backend');
    fetchNotes(); // Load notes from database when app starts
  }, []);

  // FUNCTIONS - What happens when user clicks buttons
  const addNote = async () => {
    if (!inputText.trim()) return; // Don't add empty notes

    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      console.log('📝 Adding note to backend:', inputText);
      
      // Send POST request to backend
      const response = await axios.post(`${API_BASE_URL}/notes`, {
        text: inputText
      });
      
      console.log('✅ Note added successfully:', response.data);
      
      // Add the new note (with real database ID) to the beginning of the list
      setNotes([response.data, ...notes]);
      setInputText(''); // Clear input field
      
    } catch (err) {
      console.error('❌ Error adding note:', err);
      setError('Failed to add note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      console.log('🗑️ Deleting note from backend, ID:', id);
      
      // Send DELETE request to backend
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
      
      console.log('✅ Note deleted successfully from backend');
      
      // Remove note from frontend state (optimistic update)
      setNotes(notes.filter(note => note.id !== id));
      
    } catch (err) {
      console.error('❌ Error deleting note:', err);
      setError('Failed to delete note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // RENDER - What the user sees
  return (
    <div className="app">
      <h1>📝 Simple Notes App</h1>
      
      {/* ERROR MESSAGE */}
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
      
      {/* LOADING INDICATOR */}
      {loading && (
        <div className="loading-indicator">
          🔄 Loading...
        </div>
      )}
      
      {/* INPUT FORM */}
      <div className="input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write your note here..."
          className="note-input"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addNote();
            }
          }}
        />
        <button
          onClick={addNote}
          disabled={loading} // Disable button during API calls
          className="add-button"
        >
          {loading ? '⏳ Adding...' : 'Add Note'}
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="notes-section">
        <h3>Your Notes ({notes.length})</h3>
        {notes.length === 0 ? (
          <div className="empty-state">
            No notes yet. Add your first note above! 📝
          </div>
        ) : (
          <div className="notes-list">
            {notes.map(note => (
              <div key={note.id} className="note-item">
                <span className="note-text">{note.text}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STATUS INFO */}
      <div className="status-info">
        <strong>🎉 Full-Stack App Complete!</strong><br/>
        ✅ Frontend connected to backend<br/>
        ✅ Data persists in SQLite database<br/>
        ✅ All CRUD operations working<br/>
        💡 Open browser console to see API logs<br/>
        🔄 Try refreshing page - notes stay!
      </div>
    </div>
  );
}

export default App;