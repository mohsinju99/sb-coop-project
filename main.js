"use strict";

let tuning = ["E", "A", "D", "G", "B", "E"];
let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
let num_strings = 6;
let num_frets = 10;
let fretboard = generateFretboard();

let chord_types = ["maj", "min", "dim"];

document.addEventListener("DOMContentLoaded", (event) => {
    
    //generateFretboard();

    createFretboardDisplay();
    createChordSearchForm();
});

function showFretboard()
{
    hideChordSearch();

    const fretboard_div = document.getElementById("fretboard-div");
    fretboard_div.style.display = "flex";
}

function hideFretboard()
{
    const fretboard_div = document.getElementById("fretboard-div");
    fretboard_div.style.display = "none";
}

function showChordSearch()
{
    hideFretboard();

    const chord_search_div = document.getElementById("chord-search-div");
    chord_search_div.style.display = "grid";
}

function hideChordSearch()
{
    const chord_search_div = document.getElementById("chord-search-div");
    chord_search_div.style.display = "none"; 
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
    const fretboard_display = document.createElement('div');
    fretboard_display.id = "fretboard-display";

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

function toggleNote()
{
    document.getElementById(this.id).childNodes[0].classList.toggle("hidden");
}

function createChordSearchForm() 
{
    const chord_search_display = document.createDocumentFragment();
    const form = document.createElement('form');

    const note_select = document.createElement('select');
    note_select.id = "noteSelect";
    
    for (let i = 0; i < notes.length; i++)
    {
        const new_option = document.createElement('option');
        new_option.text = notes[i];
        new_option.value = notes[i];

        note_select.options.add(new_option);
    }

    form.appendChild(note_select);

    const chord_type_select = document.createElement('select');
    chord_type_select.id = "chordTypeSelect";

    for (let i = 0; i < chord_types.length; i++)
    {
        const new_option = document.createElement('option');
        new_option.text = chord_types[i];
        new_option.value = chord_types[i];

        chord_type_select.options.add(new_option); 
    }

    form.appendChild(chord_type_select);

    const form_submit_btn = document.createElement('input');
    form_submit_btn.type = "submit";
    form_submit_btn.text = "Search";
    form_submit_btn.id  = "form-submit-btn";

    form.appendChild(form_submit_btn);

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const form = e.target;
        
        const chord = form.noteSelect.value + form.chordTypeSelect.value;

        getChord(chord);
    });

    chord_search_display.appendChild(form);

    const image_container = document.createElement('div');
    image_container.id = "image-container";

    chord_search_display.appendChild(image_container);

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