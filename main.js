"use strict";

let tuning = ["E", "A", "D", "G", "B", "E"];
let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let num_strings = 6;
let num_frets = 10;
let fretboard = generateFretboard(); // generates the fretboard based on tuning

let chord_types = ["maj", "min", "dim"];

document.addEventListener("DOMContentLoaded", (event) => {
    createFretboardDisplay(); // creates interactive fretboard
    createChordSearchForm(); // creates chord search from
});

function showFretboard()
{
    // first hides the chord search form
    hideChordSearch();

    // gets fretboard div and changes display from 'none' to 'flex'
    const fretboard_div = document.getElementById("fretboard-div");
    fretboard_div.style.display = "flex";
}

function hideFretboard()
{
    // changes display from 'flex' to 'none'
    const fretboard_div = document.getElementById("fretboard-div");
    fretboard_div.style.display = "none";
}

function showChordSearch()
{
    // first hides fretboard
    hideFretboard();

    // gets chord search div and changes display from 'none' to 'grid'
    const chord_search_div = document.getElementById("chord-search-div");
    chord_search_div.style.display = "grid";
}

function hideChordSearch()
{
    // changes display from 'grid' to none'
    const chord_search_div = document.getElementById("chord-search-div");
    chord_search_div.style.display = "none"; 
}


function generateFretboard()
{
    let fretboard = [];

    // for each string, set all notes on that string
    for (let s = 0; s < num_strings; s++)
    {
        let string_notes = [];

        // notes on string start with the tuning note
        let curr_note = tuning[s];

        // for each fret, assign the corresponding note
        for (let f = 0; f < num_frets; f++)
        {
            
            string_notes.push(curr_note);
            let next_note_index = notes.indexOf(curr_note) + 1;
            
            // if reached the end of the notes list, go back to the start
            if (next_note_index >= notes.length)
            {
                next_note_index = 0;
            }

            curr_note = notes[next_note_index];

        }

        // add string to fretboard
        fretboard.push(string_notes);

    }

    console.log(fretboard);    

    return fretboard;
}

function createFretboardDisplay()
{
    // creates a div to hold the fretboard
    const fretboard_display = document.createElement('div');
    fretboard_display.id = "fretboard-display";

    for (let s = 0; s < num_strings; s++)
    {
        // creates a new string div for each string
        const curr_string = document.createElement('div');
        curr_string.className = "string";
        curr_string.id = "string-" + s + "-div";

        // adds a div for the string line on the display
        const string_line = document.createElement('div');
        string_line.className = "string-line";
        curr_string.appendChild(string_line);

        for (let f = 0; f < num_frets; f++)
        {           
            // creates a new div for each fret
            const curr_fret = document.createElement('div');
            curr_fret.className = "fret";
            curr_fret.id = "fret-" + f + "-string-" + s + "-div";

            // assign an on click event for each fret, which toggles note visibility
            curr_fret.addEventListener("click", toggleNote);

            // creates a div that holds the note on each fret
            const curr_note = document.createElement('div');
            curr_note.className = "note";
            curr_note.innerHTML = fretboard[s][f];
            curr_note.classList.toggle("hidden");
            curr_fret.appendChild(curr_note); // add note to current fret

            curr_string.appendChild(curr_fret); // add fret to current string
            
        }

        fretboard_display.appendChild(curr_string); // add string to fretboard
    }

    // add the fretboard display to the fretboard div
    document.getElementById("fretboard-div").appendChild(fretboard_display);
}

function toggleNote()
{
    // toggles note visibility
    document.getElementById(this.id).childNodes[0].classList.toggle("hidden");
}

function createChordSearchForm() 
{
    // creates form and display for form
    const chord_search_display = document.createDocumentFragment();
    const form = document.createElement('form');

    // creates a select element for notes
    const note_select = document.createElement('select');
    note_select.id = "noteSelect";
    
    // populates the note select's options
    for (let i = 0; i < notes.length; i++)
    {
        const new_option = document.createElement('option');
        new_option.text = notes[i];
        new_option.value = notes[i];

        note_select.options.add(new_option);
    }

    // adds note select to the form
    form.appendChild(note_select);

    // creates a select element for the chord type
    const chord_type_select = document.createElement('select');
    chord_type_select.id = "chordTypeSelect";

    // populates the chord type select's options
    for (let i = 0; i < chord_types.length; i++)
    {
        const new_option = document.createElement('option');
        new_option.text = chord_types[i];
        new_option.value = chord_types[i];

        chord_type_select.options.add(new_option); 
    }

    // adds chord type select to the form
    form.appendChild(chord_type_select);

    // creates and adds submit button to form
    const form_submit_btn = document.createElement('input');
    form_submit_btn.type = "submit";
    form_submit_btn.text = "Search";
    form_submit_btn.id  = "form-submit-btn";
    form.appendChild(form_submit_btn);

    // event listener for form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // get form element
        const form = e.target;
        
        // get chord value from form selects
        const chord = form.noteSelect.value + form.chordTypeSelect.value;

        // get chord image from API
        getChord(chord);
    });

    // add form to the chord search display
    chord_search_display.appendChild(form);

    // creates and adds a div to hold the chord image
    const image_container = document.createElement('div');
    image_container.id = "image-container";
    chord_search_display.appendChild(image_container);

    // adds chord search display to the page
    document.getElementById("chord-search-div").appendChild(chord_search_display);
    
}

function getChord(chord)
{
    const output_img = document.createElement('ins');

    output_img.className = "scales_chords_api";
    output_img.setAttribute("chord", chord);

    document.getElementById("image-container").appendChild(output_img);

    console.log("Form Submitted");
    console.log(chord);
    console.log(output_img);
}