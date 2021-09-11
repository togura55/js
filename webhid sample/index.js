
//
//  index HTML supported procedures
//

import { setFilters, parseDevice, getStatus, getInformation } from './hid_control.js';

// event registration Buttons
const checkButton = document.querySelector(`#check-button`);
checkButton.addEventListener(`click`, parseDevice);
const statusButton = document.querySelector(`#status-button`);
statusButton.addEventListener(`click`, getStatus);
const informationButton = document.querySelector(`#information-button`);
informationButton.addEventListener(`click`, getInformation);

// Event registration Checkbox
const filterCheckbox = document.querySelector('#isFilterdCheckbox');
filterCheckbox.addEventListener(`change`, filterCheckboxChange);

var openFileButton = document.getElementById('openFile');

function filterCheckboxChange() {
    if (this.checked == false) {
        openFileButton.setAttribute("disabled", true);
        openFileButton.style.color = "White";
    } else {
        openFileButton.removeAttribute("disabled");
        openFileButton.style.color = "black";
    }
};

// Hook console.X to export both UI and console
"log,warn,error.info".split(",").forEach(function (key) {
    var origin = console[key];

    //overwritten 
    console[key] = function (log) {
        // if(console.development){
        document.getElementById('console_log').innerHTML += log + "<br>";
        origin.apply(console, arguments);
        // }
    };
});

if ("hid" in navigator) {
    // The WebHID API is supported.
    console.log(`WebHID API is supported.`);
} else {
    console.log(`WebHID API is NOT supported. Bye!`);
};


//
// Read the device-list-file operation
//
let fileInput = document.getElementById('openFile');
let fileReader = new FileReader();
fileInput.onchange = () => {
    let file = fileInput.files[0];
    fileReader.readAsText(file);
};

fileReader.onload = function () {
    setFilters(convertCSVtoArray(fileReader.result));
};

// Convert the read CSV data to a two-dimensional array
function convertCSVtoArray(str) {
    var result = []; // An array to hold the final two-dimensional array
    var tmp = str.split("\n"); // Generate an array with lines

    // Generate two-dimentional array with "," separated
    for (var i = 0; i < tmp.length; ++i) {
        tmp[i] = tmp[i].replace("\r", "");
        result[i] = tmp[i].split(',');
    }
    result = result.map(x => x.map(str => parseInt(str, 10)));

    return result;
};
