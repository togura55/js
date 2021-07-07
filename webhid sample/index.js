
//
//  index HTML supported procedures
//
import { parseDevice } from './hid_control.js';

const checkButton = document.querySelector(`#check-button`);
checkButton.addEventListener(`click`, parseDevice);

// Hook console.log to export both UI and console
var origin = console.log;
console.log = function (logStrings) {
    document.getElementById('console_log').innerHTML += logStrings + "<br>";
    origin.apply(console, arguments);
};

if ("hid" in navigator) {
    // The WebHID API is supported.
    console.log(`WebHID API is supported.`);
} else {
    console.log(`WebHID API is NOT supported. Bye!`);
};
