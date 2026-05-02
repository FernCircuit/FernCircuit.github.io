

// ------------------NOTEPAD JS-------------------------
//------------------------------------------------------
// Purpose: Take user's inputted text and save to local cache storage
// using JS localStorage, built-in web browser object compatible on all browsers
// clearing cache removes the note, but refreshing does not... to simulate a database


//getItem: requests data from browser cache
//setItem: sends data to browser cache

const textarea = document.getElementById('notepad'); //RETRIEVES NOTEPAD TEXTAREA AND ASSIGNS TO VARIABLE TEXTAREA

//checks if folder exists in localStorage; if not, use empty string to start
//textarea.value takes existing text and displays it in the textarea
textarea.value = localStorage.getItem('fcNoteFolder') || ''; 

//watches the text box for changes then initiates code
textarea.addEventListener('input',()=>{
    //sends note text to the folder
    localStorage.setItem("fcNoteFolder", textarea.value);
});

// --------------TRACKER DATA-------------------------
// ----------LOAD ALL TASKS ON STARTUP----------------
const allTasks = document.querySelectorAll('.box-text');

allTasks.forEach(task=>{
    const savedText = localStorage.getItem(task.id);
    const container = task.closest('.task-primary');
    
    if(savedText !== null){
        task.innerText = savedText;
    }
});



// --------------SHOW/HIDE SUBTASKS-------------------
//----------------------------------------------------
// setAttribute: adds new attribute to an element or changes existing one
// getAttribute: reads value of an attribute on html tag

//get all the arrow buttons with class .arrow-btn
const allArrows = document.querySelectorAll('.arrow-btn'); 

//this is a loop to add EventListeners to each arrow button instead of just doing one at a time
allArrows.forEach(btn=> {
    btn.addEventListener('click', toggleSubtasks); //calls the function toggleSubtasks
});

// function to 1.) rotate the arrow and 2.) display all subtasks under a given class with specific data-group
function toggleSubtasks(){ 
    // rotate the arrow
    this.classList.toggle('rotate-arrow'); //when clicked, rotate the arrow down
    
    const getTask = document.querySelectorAll(`.subtask[data-group="${this.id}"]`); //looks for class subtask and matching datagroup
    
    // hide/unhide subtasks
    getTask.forEach(div =>{
        div.classList.toggle('hidden');
    });
}

// -------------------EDIT TASK ---------------------
//----------------------------------------------------

//get all edit buttons 
const allEdits = document.querySelectorAll('.icon-edit');

//loop through to apply event listener to each
allEdits.forEach(btn=>{
    btn.addEventListener('click', editTask);
});

function editTask(){ //function to edit

    const btn = this; //this is the button that was just clicked

    //since there are a gazillion layers, we need to find the text in the nearest vicinity
    const container = btn.closest('.task-primary, .subtask'); //'closest' finds the container that holds the button, either primary or subtask

    const task = container.querySelector('.box-text'); //get text to edit
    const btnImg = container.querySelector('.icon-edit'); //get img to change to save icon

    if (task.contentEditable === "false"){ //default setting is false shown in html elements
        // turn on editing
        task.contentEditable = "true"; //turn editable text on
        task.classList.add("editing"); //add the editing class to class list, which makes it look like a text box
        task.focus(); //this is cool -- highlights the editable field and moves cursor there so the user knows

        // this changes the edit icon to an orange save icon
        btnImg.src = "assets/icons/icon-save.svg";

    } else {
        // turn off editing
        task.contentEditable = "false"; //change html back to false
        task.classList.remove("editing"); //remove the class, text becomes static
        // this changes the save icon back to an edit icon
        btnImg.src = "assets/icons/icon-edit.svg";

        //Save new text to local cache
        localStorage.setItem(task.id, task.innerText);
    }   
}



// ------------------COMPLETE TASK---------------------
// ----------------------------------------------------

const allComplete = document.querySelectorAll('.action-complete');

allComplete.forEach(btn=>{
    btn.addEventListener('click', completeTask);
});

function completeTask(){
    
    const row = this.closest('.task-primary, .subtask');//find the primary task
    row.querySelector('.icon-status').src = "assets/icons/icon-complete.svg";

    const container = row.parentElement;
    const count = container.querySelectorAll('img[src*="icon-complete"]').length;
    if(count === 3){
        container.previousElementSibling.querySelector('.icon-status').src="assets/icons/icon-complete.svg";
    }
  
    // src for green check img
        btnImg.src = "assets/icons/icon-complete.svg";

        const arrow = row.querySelector('.arrow-btn');
        toggleSubtasks.call(arrow); 


}
//things I learned: getElementById only exists on document object 
//(in other words, must search entire document instead of just the container

//In PROGESS
//const container = row.parentElement;//get the "stack" (container with all tasks) which is grid-container-3a
//const footer = document.getElementById('tfoot-tracker');//we need to find the footer to know where to move the task
//const subtasks = container.querySelectorAll(`.subtask[data-group="${arrow.id}"]`);
//the logic to move it:
//container.insertBefore(row, footer);
//subtasks.forEach(subtask=>container.insertBefore(subtask, footer));