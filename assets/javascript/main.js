

// ----------STICKY NOTE JS-----------
// Purpose: Take user's inputted text and save to local cache storage
// using JS localStorage, built-in web browser object compatible on all browsers
// clearing cache removes the note, but refreshing does not
//getItem: requests data from browser cache
//setItem: sends data to browser cache

const textarea = document.getElementById('sticky-note'); //RETRIEVES STICKY NOTE TEXTAREA AND ASSIGNS TO VARIABLE TEXTAREA

//checks if folder exists in localStorage; if not, use empty string to start
//textarea.value takes existing text and displays it in the textarea
textarea.value = localStorage.getItem('fcNoteFolder') || ''; 

//watches the text box for changes then initiates code
textarea.addEventListener('input',()=>{
    //sends note text to the folder
    localStorage.setItem("fcNoteFolder", textarea.value);
});


// ADD SUBTASK 


// TOGGLE SUBTASKS

// ----------SHOW/HIDE SUBTASKS-----------
// setAttribute: adds new attribute to an element or changes existing one
// getAttribute: reads value of an attribute on html tag

const btn = document.querySelector('.toggle-subtasks');

function rotateArrow(){
    btn.classList.toggle('rotate-arrow');
}


btn.addEventListener('click',()=>{
    rotateArrow();
});