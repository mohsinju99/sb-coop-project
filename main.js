"use strict";


document.addEventListener("DOMContentLoaded", (event) => {
    createFretboard(6, 10);
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

function createFretboard(num_frets, num_strings) {
    //const fretboard = document.getElementById("fretboard-div");
    const fretboard = document.createDocumentFragment();

    for (let s = 0; s < num_strings; s++) {
        const curr_string = document.createElement('div');
        curr_string.className = "string";
        curr_string.id = "string-" + s + "-div";

        for (let f = 0; f < num_frets; f++) {
            const curr_fret = document.createElement('div');
            curr_fret.className = "fret";
            curr_fret.id = "fret-" + f + "-string-" + s + "-div";
        }
    }

    document.getElementById("fretboard-div").appendChild(fretboard);
}