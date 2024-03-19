const saveNoteBtn = document.querySelector('.save-btn')
const deleteNoteBtn = document.querySelector('.delete-btn')
const newNoteBtn = document.querySelector('.new-btn')
const editNoteBtn = document.querySelector('.edit-btn')
const selectNoteBtn = document.querySelector('.select-btn')
const inputForm = document.querySelector('.input-form')
const noteInputArea = document.querySelector('.input')
const noteDisplayArea = document.querySelector('.display-notes')


let notes = (JSON.parse(localStorage.getItem('notes')))

displayNotes()

// New note
newNoteBtn.addEventListener('click', function () {
    newNoteMode('on');
    noteInputArea.focus();
})

function newNoteMode (state) {
    if (state === 'on') {
        inputForm.style.opacity = '100';
    } else {
        inputForm.style.opacity = '0';
    }
}

// Save note
saveNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let noteText = noteInputArea.value;
    noteInputArea.value = '';

    let note = new Map;
    note.id = Date.now()
    note.content = noteText

    saveNote(note);
    displayNotes();

    newNoteMode('off');
})

// Save note
function saveNote (note) {
    notes.push(note)
    let notesStr = JSON.stringify(notes)
    localStorage.setItem('notes', notesStr)
}

// Abort note
deleteNoteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    noteInputArea.value = '';
    newNoteMode('off')
})

// Display notes
function displayNotes () {
    noteDisplayArea.innerHTML = ''
    notes.forEach(function (note) {
        let noteHTML = createNoteHTML(note.content)
        noteDisplayArea.appendChild(noteHTML)
    })
}

function createNoteHTML (note) {
    let p = document.createElement('p')
    p.innerText = note
    let check = document.createElement('input')
    check.type = 'checkbox'
    check.className = 'select'
    p.appendChild(check)
    return p
}

// Select btn
selectNoteBtn.addEventListener('click', function () {
    console.log('select')
    let btns = noteDisplayArea.querySelectorAll('.select')
    btns.forEach(b => {b.style.opacity = '100'})

})

