"use strict";

let tuning = ["E", "A", "D", "G", "B", "E"];
let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let num_strings = 6;
let num_frets = 10;
let fretboard = generateFretboard();

document.addEventListener("DOMContentLoaded", (event) => {
    
    //generateFretboard();

    createFretboardDisplay(num_frets, num_strings);
});

function toggleFretboardVisibility()
{
    document.getElementById("fretboard-div").classList.toggle("hidden");
    document.getElementById("chord-search-div").classList.toggle("hidden");
}

function toggleChordSearchVisibility()
{
    document.getElementById("chord-search-div").classList.toggle("hidden");
    document.getElementById("fretboard-div").classList.toggle("hidden");
}

function generateFretboard()
{
    let fretboard = [];

    for (let s = 0; s < num_strings; s++)
    {
        let string_notes = [];

        // notes on string start with the tuning note
        let curr_note = tuning[s];

        for (let f = 0; f < num_frets; f++)
        {
            
            string_notes.push(curr_note);
            let next_note_index = notes.indexOf(curr_note) + 1;
            
            if (next_note_index >= notes.length)
            {
                next_note_index = 0;
            }

            curr_note = notes[next_note_index];

        }

        fretboard.push(string_notes);

    }

    console.log(fretboard);    

    return fretboard;
}

function createFretboardDisplay()
{
    //const fretboard = document.getElementById("fretboard-div");
    const fretboard_display = document.createDocumentFragment();

    for (let s = 0; s < num_strings; s++)
    {
        const curr_string = document.createElement('div');
        curr_string.className = "string";
        curr_string.id = "string-" + s + "-div";

        for (let f = 0; f < num_frets; f++)
        {           
            const string_line = document.createElement('div');
            string_line.className = "string-line";
            curr_string.appendChild(string_line);

            const curr_fret = document.createElement('div');
            curr_fret.className = "fret";
            curr_fret.id = "fret-" + f + "-string-" + s + "-div";

            curr_fret.addEventListener("click", toggleNote);


            const curr_note = document.createElement('div');
            curr_note.className = "note";
            //curr_note.id = "note-" + f + "-string-" + s + "-div";
            curr_note.innerHTML = fretboard[s][f];
            curr_note.classList.toggle("hidden");
            curr_fret.appendChild(curr_note);

            curr_string.appendChild(curr_fret);

            //console.log("loopin fret");
            
        }

        //console.log("loopin string");

        fretboard_display.appendChild(curr_string);
    }

    //console.log(document.getElementById("fretboard-div"));
    document.getElementById("fretboard-div").appendChild(fretboard_display);
}

function toggleNote(event)
{
    document.getElementById(this.id).childNodes[0].classList.toggle("hidden");
}