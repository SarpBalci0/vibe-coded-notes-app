//connects react to the html page

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; //Gets your main component

const root = ReactDOM.createRoot(document.getElementById('root')); //Finds the <div id="root"> in index.html
root.render(<App />); //Puts your App component inside that div