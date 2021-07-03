

const connectedMyDevices = new Map();

navigator.hid.addEventListener('connect', async ({ device }) => {
  console.log(`HID connected: ${device.productName}`);
  connectedMyDevices.set(device.productId, await connectDevice(device));
});

navigator.hid.addEventListener('disconnect', ({ device }) => {
  console.log(`HID disconnected: ${device.productName}`);
  connectedMyDevices.delete(device.productId);
});

// document.addEventListener('DOMContentLoaded', async () => {
//   const devices = await navigator.hid.getDevices();
//   devices.forEach(async (device) => {
//     connectedMyDevices.set(device.productId, await connectDevice(device));
//   });
// });

const connectMyDevices = async () => {
  // Filter on devices with the USB Vendor/Product IDs.
  const filters = [
    {
      vendorId: 0x056a, // Wacom Co., Ltd
      productId: 0x00a8, // STU-540
    },

    {
      vendorId: 0x056a, // Wacom Co., Ltd
      productId: 0x00a5, // STU-530
    },

    {
      vendorId: 0x056a, // Wacom Co., Ltd
      productId: 0x00a4, // STU-430
    },
    // {
    //   vendorId: 0x057e, // Nintendo Co., Ltd
    //   productId: 0x2006, // Joy-Con Left
    // },
    // {
    //   vendorId: 0x057e, // Nintendo Co., Ltd
    //   productId: 0x2007, // Joy-Con Right
    // },
  ];
  // Prompt user to select a Joy-Con device.
  // try {
  //   const [device] = await navigator.hid.requestDevice({ filters });
  //   if (!device) {
  //     return;
  //   }

  //   // Get all devices
  //   const devices = await navigator.hid.getDevices();

  //   // devices.forEach(async (device) => {
  //   //   connectedMyDevices.set(device.productId, await connectDevice(device));
  //   // });

  //   // connectedMyDevices.set(device.productId, await connectDevice(device));
  // } catch (error) {
  //   console.error(error.name, error.message);
  // }

  try {
    // If devices are found, then a user-confirmation dialog is pop-up.
    const [device] = await navigator.hid.requestDevice({ filters });
    if (!device) {
      return;
    }
    // a list of devices the website has been granted access to previously.
    const devices = await navigator.hid.getDevices();

    let outputStrings = `requestDevice: ` + device.productName + `, ` + device.serialNumber + `, ` + device.manufacturerName;
    console.log(outputStrings);
    var result = document.getElementById("resultDevices");
    result.innerHTML = outputStrings;

    // for (let collection of device.collections) {
    //     // A HID collection includes usage, usage page, reports, and subcollections.
    //     console.log(`Usage: ${collection.usage}`);
    //     console.log(`Usage page: ${collection.usagePage}`);

    //     for (let inputReport of collection.inputReports) {
    //         console.log(`Input report: ${inputReport.reportId}`);
    //         // Loop through inputReport.items
    //     }

    //     for (let outputReport of collection.outputReports) {
    //         console.log(`Output report: ${outputReport.reportId}`);
    //         // Loop through outputReport.items
    //     }

    //     for (let featureReport of collection.featureReports) {
    //         console.log(`Feature report: ${featureReport.reportId}`);
    //         // Loop through featureReport.items
    //     }

    //     // Loop through subcollections with collection.children
    // };
    // devices.forEach(async (device) => {
    //     //                      connectedMyDevices.set(device.productId, await connectDevice(device));
    //     console.log(`getDevices: ${device.productName} ${device.venderName}`);
    // });

  } catch (error) {
    console.error(error.name, error.message);
  };
};

const connectDevice = async (device) => {
  let myDevice;
  if (device.productId === 0x2006) {
    joyCon = new JoyConLeft(device);
  } else if (device.productId === 0x2007) {
    joyCon = new JoyConRight(device);
  }
  await myDevice.open();
  await myDevice.enableStandardFullMode();
  await myDevice.enableIMUMode();
  return myDevice;
};

export { connectMyDevices, connectedMyDevices };