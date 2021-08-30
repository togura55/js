//
//  HID device control functions
//

let isFiltered = document.getElementById('isFilterdCheckbox');

let filters = [
    {
        vendorId: 0x056a, // Wacom Co., Ltd
        productId: 0x00a5 // STU-530
    },

    {
        vendorId: 0x056a, // Wacom Co., Ltd
        productId: 0x00a4 // STU-430
    }
];

let hidDevice;

const connectedDevices = new Map();

if ("hid" in navigator) {
    // The WebHID API is supported.
    navigator.hid.addEventListener("connect", event => {
        // Automatically open event.device or warn user a device is available.
        console.log(`A device was connected.`);
    });
    
    navigator.hid.addEventListener("disconnect", event => {
        // Remove |event.device| from the UI.
        console.log(`A device was disconnected.`);
    });
}else{
    console.log(`This browse does not support WebHid API.`);
}



//
// Set device IDs to filters object
//
//  @arr - 2-D array stored pair of HID venderID and venderID
//
const setFilters = function (arr) {
    filters = [];  // Once clear the pre-defined device list
    arr.forEach(function (el) {
        console.log(el);
        filters.push({ vendorId: el[0], productId: el[1] });
    });
};

//
// Parse HID devices
//
const parseDevice = async () => {
    try {
        let device;
        // Prompt user to select a Hid device on a dialog.
        // Must be handling a user gesture. Otherwise, generate an error by WebHID
        if (!isFiltered.checked) filters = [];
        [device] = await navigator.hid.requestDevice({ filters });

        if (!device) {
            console.log(`No selected HID devices are found.`);
            return;
        }
        console.log(`User selected "` + device.productName + `" is accessible via WebHID.`);

        // A HIDDevice object contains USB vendor and product identifiers for device identification. 
        // Its collections attribute is initialized with a hierarchical description of the device's report formats.
        for (let collection of device.collections) {
            // A HID collection includes usage, usage page, reports, and subcollections.
            console.log(`Usage: ${collection.usage}`);
            console.log(`Usage page: ${collection.usagePage}`);

            for (let inputReport of collection.inputReports) {
                console.log(`Input report: ${inputReport.reportId}`);
                // Loop through inputReport.items
            }

            for (let outputReport of collection.outputReports) {
                console.log(`Output report: ${outputReport.reportId}`);
                // Loop through outputReport.items
            }

            for (let featureReport of collection.featureReports) {
                console.log(`Feature report: ${featureReport.reportId}`);
                // Loop through featureReport.items
            }
            // Loop through subcollections with collection.children
        }

        // go connection
        connectedDevices.set(device.productId, await connectDevice(device));

        //        connectedDevices.delete(device.productId);
    } catch (error) {
        console.error(error.name, error.message);
    }
};

//
// Feature Report Status [GET]
//
const getStatus = async () => {
    try {
        await hidDevice.getStatus();
    } catch (error) {
        console.error(error.name, error.message);
    }
};

//
// Feature Report Information [GET]
//
const getInformation = async () => {
    try {
        await hidDevice.getInformation();
    } catch (error) {
        console.error(error.name, error.message);
    }
};

//
// Open a device
//
const connectDevice = async (device) => {
    //   let hidDevice;

    hidDevice = new StuDevice(device);

    // Open the connect by HIDDevice.open
    // The HIDDevice devices are by default returned in a "closed" state 
    // and must be opened by calling open() before data can be sent or received.
    await hidDevice.open();

    //   await hidDevice.close();

 //   await hidDevice.getStatus();
    return hidDevice;
};

// 
//  Class definitions for Wacom STU devices 
//  
//   @class StuDeviceCore
//   @extends {EventTarget}
//  
class StuDeviceCore extends EventTarget {
    // 
    //  Creates an instance of StuDeviceCore.
    //
    //  @param {HIDDevice} device
    //  @memberof StuDeviceCore
    // 
    constructor(device) {
        super();
        this.device = device;
    }

    // 
    //  Opens the device and set the listener from the device
    // 
    //  @memberof StuDeviceCore
    // 
    async open() {
        if (!this.device.opened) {
            await this.device.open();
            console.log(`A device is open.`);
        }
        // Set the hearing input from the device
        this.device.addEventListener('inputreport', this._onInputReport.bind(this));
    };

    // 
    //  Close the device and discard the listener from the device
    // 
    //  @memberof StuDeviceCore
    // 
    async close() {
        if (this.device.opened) {
            await this.device.close();
            console.log(`A device is closed.`);
        }
        // Discard the hearing input from the device
        this.device.removeEventListener('inputreport', this._onInputReport.bind(this));
    };

    //
    // Requests Status about the device.
    //
    // @memberof 
    //
    async getStatus() {
        const featureReportID = 0x01;    // ToDo feature report
        const subcommand = [0x03];
        const data = [
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            ...subcommand,
        ];
        await this.device.sendReport(featureReportID, new Uint8Array(data));

        return new Promise((resolve) => {
            const onStatus = ({ detail: status }) => {
                this.removeEventListener('status', onStatus);
                delete status._raw;
                delete status._hex;
                resolve(status);
            };
            this.addEventListener('status', onStatus);
        });
    }

    //
    // Requests information of the device.
    //
    // @memberof 
    //
    async getInformation() {
        const featureReportID = 0x01;
        const subCommand = [0x08];
        const data = [
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            ...subCommand,
        ];
        await this.device.sendReport(featureReportID, new Uint8Array(data));

        return new Promise((resolve) => {
            const onInformation = ({ detail: information }) => {
                this.removeEventListener('information', onInformation);
                delete information._raw;
                delete information._hex;
                resolve(information);
            };
            this.addEventListener('information', onInformation);
        });
    }

    // 
    //  Deal with `oninputreport` events.
    //  
    //   @param {*} event
    //   @memberof StuDeviceCore
    //  
    _onInputReport(event) {
        let { data, reportId, device } = event;

        if (!data) {
            return;
        }

        data = concatTypedArrays(
            new Uint8Array([reportId]),
            new Uint8Array(data.buffer)
        );
        const hexData = data.map((byte) => byte.toString(16));

        let packet = {
            inputReportID: PacketParser.parseInputReportID(data, hexData),
        };

        switch (reportId) {
            case 0x03: {
                packet = {
                    ...packet,
                    buttonStatus: PacketParser.parseButtonStatus(data, hexData),
                    analogStick: PacketParser.parseAnalogStick(data, hexData),
                    filter: PacketParser.parseFilter(data, hexData),
                };
                break;
            }
            case 0x08: {
                packet = {
                    ...packet,
                    buttonStatus: PacketParser.parseButtonStatus(data, hexData),
                    analogStick: PacketParser.parseAnalogStick(data, hexData),
                    filter: PacketParser.parseFilter(data, hexData),
                };
                break;
            }
        }
        if (packet.status?.type) {
            this._receiveStatus(packet.status);
        }
        if (packet.information?.level) {
            this._receiveInformation(packet.information);
        }
        this._receiveInputEvent(packet);
    }

    //
    //
    //
    // @param {*} Status
    // @memberof StuDevice
    //
    _receiveStatus(status) {
        this.dispatchEvent(new CustomEvent('status', { detail: status }));
    }

    //
    //
    //
    // @param {*} Information
    // @memberof StuDevice
    //
    _receiveInformation(information) {
        this.dispatchEvent(
            new CustomEvent('information', { detail: information })
        );
    }
};

// 
// 
// 
//  @class StuDevice
//  @extends {StuDeviceCore}
// 
class StuDevice extends StuDeviceCore {
    // 
    //  Creates an instance of StuDevice.
    //   @param {HIDDevice} device
    //   @memberof StuDevice
    //  
    constructor(device) {
        super(device);
    }

    // 
    //  
    //  
    //   @param {*} packet
    //   @memberof StuDevice
    //  
    _receiveInputEvent(packet) {
        delete packet.buttonStatus.up;
        delete packet.buttonStatus.down;
        delete packet.buttonStatus.left;
        delete packet.buttonStatus.right;
        delete packet.buttonStatus.minus;
        delete packet.buttonStatus.l;
        delete packet.buttonStatus.zl;
        delete packet.buttonStatus.capture;
        delete packet.buttonStatus.leftStick;

        this.dispatchEvent(new CustomEvent('hidinput', { detail: packet }));
    }
};

export { setFilters, parseDevice, getStatus, getInformation, connectedDevices };