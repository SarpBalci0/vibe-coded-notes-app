import React, {useState, useEffect} from 'react';

function App(){
    //STATE - Data your app remembers
    const[notes, setNotes] = useState([]); //list of all notes
    const[inputText, setInputText] = useState(''); // text in the input field

    //this runs when the app starts
    useEffect(() => {
        console.log('App started - ready to fetch notes from backend');

    }, []);

    //FUNCTIONS - What happens when the app starts
    const addNote = () => {
        if(inputText.trim() === ''){
            
}