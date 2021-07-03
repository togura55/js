import { connectMyDevices, connectedMyDevices } from '../src/index.js';

const connectButton = document.querySelector('#connect-my-devices');

connectButton.addEventListener('click', connectMyDevices);



// My Devices may sleep until touched, so attach the listener dynamically.
// setInterval(async () => {
//   for (const myDevices of connectedMyDevices.values()) {
//     if (myDevices.eventListenerAttached) {
//       continue;
//     }
//     await myDevices.open();
//     await myDevices.enableStandardFullMode();
//     await myDevices.enableIMUMode();
//     await myDevices.enableVibration();
//     myDevices.addEventListener('hidinput', (event) => {
//       visualize(myDevices, event.detail);
//     });
//     myDevices.eventListenerAttached = true;
//   }
// }, 2000);

