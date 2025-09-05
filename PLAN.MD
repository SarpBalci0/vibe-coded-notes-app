# 📝 Simple Notes App - Beginner Development Plan

## Project Overview

A **very beginner-friendly** full-stack notes application built with React, Node.js, and SQLite.

This app must only include one backend, one frontend and one database file for the **absolute simplicity**.

This app focuses only on the **core basics**:  
- Add a note  
- View all notes  
- Delete a note  

This keeps the project simple while teaching the **full flow** of frontend → backend → database.

---

## Tech Stack

- **Frontend**: React (with `useState` and `useEffect`)
- **Backend**: Node.js with Express
- **Database**: SQLite (one table only)
- **Additional**: Axios for API calls, basic CSS for styling

---

## Core Features

1. **Add Notes** – user can type a note and save it  
2. **View Notes** – list all notes on the page  
3. **Delete Notes** – remove a note by clicking delete  

---

## Database Schema

We only need **one table**:

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
);

---

## 📋 Step-by-Step Development Checklist

### Phase 1: Backend Setup (Database + Server)
- [x] **Step 1**: Setup backend package.json with dependencies
  - Install: `express`, `sqlite3`, `cors`
- [x] **Step 2**: Create basic server.js structure
  - Setup Express server on port 3001
  - Add CORS for frontend communication
- [x] **Step 3**: Setup SQLite database
  - Create connection to database.db
  - Create `notes` table if it doesn't exist
- [x] **Step 4**: Create 3 API endpoints
  - `GET /api/notes` - Get all notes
  - `POST /api/notes` - Add a new note
  - `DELETE /api/notes/:id` - Delete a note by ID

### Phase 2: Frontend Setup (React App)
- [x] **Step 5**: Setup frontend package.json with dependencies
  - Install: `axios` for API calls
- [x] **Step 6**: Create basic React App structure
  - Setup state for notes list and input field
  - Create simple form to add notes
  - Display notes in a list
- [x] **Step 7**: Connect frontend to backend
  - Use axios to call your 3 API endpoints
  - Handle loading and errors simply

### Phase 3: Testing & Polish
- [x] **Step 8**: Test the full flow
  - Start backend server: `node server.js`
  - Start frontend: `npm start` in client folder
  - Test: Add note → See in list → Delete note
- [x] **Step 9**: Add basic styling (optional)
  - Simple CSS to make it look clean

---

## 🏗️ Project Structure
```
notes-app/
├── server.js      # Node.js + Express + SQLite backend
├── database.db    # SQLite database file
├── client/        # React frontend
│   ├── src/
│   │   └── App.js
│   └── package.json
└── package.json   # For backend
```

---

## 💡 Learning Goals

After completing this project, you'll understand:
- How frontend talks to backend (HTTP requests)
- How backend talks to database (SQL queries)
- How data flows: React → Express → SQLite → Express → React
- Basic CRUD operations (Create, Read, Delete)
- How to structure a full-stack project

---

## 🚀 Getting Started

When you're ready to start coding:
1. Ask me to help with **Step 1** from the checklist
2. We'll go through each step together
3. I'll explain what each piece does and why
4. You'll learn by doing, one step at a time!
