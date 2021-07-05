
//
//  index HTML supported procedures
//
import { parseDevice } from './hid_control.js';

const checkButton = document.querySelector(`#check-button`);
checkButton.addEventListener(`click`, parseDevice);


if ("hid" in navigator) {
    // The WebHID API is supported.
    console.log(`WebHID API is supported.`);
} else {
    console.log(`WebHID API is NOT supported. Bye!`);
};
