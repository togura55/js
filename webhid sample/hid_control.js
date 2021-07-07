//
//  HID device control functions
//

let isFiltered = document.getElementById('isFilterdCheckbox');


const filters = [
    {
        vendorId: 0x056a, // Wacom Co., Ltd
        productId: 0x00a8 // STU-540
    },

    {
        vendorId: 0x056a, // Wacom Co., Ltd
        productId: 0x00a5 // STU-530
    },

    {
        vendorId: 0x056a, // Wacom Co., Ltd
        productId: 0x00a4 // STU-430
    }
];

const connectedDevices = new Map();

navigator.hid.addEventListener("connect", event => {
    // Automatically open event.device or warn user a device is available.
    console.log(`A device was connected.`);
});

navigator.hid.addEventListener("disconnect", event => {
    // Remove |event.device| from the UI.
    console.log(`A device was disconnected.`);
});

//
// Parse HID devices
//
const parseDevice = async () => {
    try {
        // Prompt user to select a Hid device on a dialog.
        // Must be handling a user gesture. Otherwise, generate an error by WebHID
        if (isFiltered.checked) {
            const [device] = await navigator.hid.requestDevice({ filters });
        } else {
            const [device] = await navigator.hid.requestDevice({ filters: [] });
        }

        if (!device) {
            console.log(`No selected HID devices are found.`);
            return;
        }

        let outputStrings = `User selected ` + device.productName + ` is accessible via WebHID.`;
        console.log(outputStrings);
        // var result = document.getElementById("resultDevices");
        // result.innerHTML = outputStrings;

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
    } catch (error) {
        console.error(error.name, error.message);
        console.log (error.name + ': ' + error.message);
    }
};

//
// Open a device
//
const connectDevice = async (device) => {
    let hidDevice;

    hidDevice = new StuDevice(device);

    // Open the connect by HIDDevice.open
    // The HIDDevice devices are by default returned in a "closed" state 
    // and must be opened by calling open() before data can be sent or received.
    await hidDevice.open();
    // await hidDevice.enableStandardFullMode();
    // await hidDevice.enableIMUMode();
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
        }
        // Set the hearing input from the device
        this.device.addEventListener('inputreport', this._onInputReport.bind(this));
    };

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
            case 0x3f: {
                packet = {
                    ...packet,
                    buttonStatus: PacketParser.parseButtonStatus(data, hexData),
                    analogStick: PacketParser.parseAnalogStick(data, hexData),
                    filter: PacketParser.parseFilter(data, hexData),
                };
                break;
            }
            case 0x21:
            case 0x30: {
                packet = {
                    ...packet,
                    timer: PacketParser.parseTimer(data, hexData),
                    batteryLevel: PacketParser.parseBatteryLevel(data, hexData),
                    connectionInfo: PacketParser.parseConnectionInfo(data, hexData),
                    buttonStatus: PacketParser.parseCompleteButtonStatus(data, hexData),
                    analogStickLeft: PacketParser.parseAnalogStickLeft(data, hexData),
                    analogStickRight: PacketParser.parseAnalogStickRight(data, hexData),
                    vibrator: PacketParser.parseVibrator(data, hexData),
                };

                if (reportId === 0x21) {
                    packet = {
                        ...packet,
                        ack: PacketParser.parseAck(data, hexData),
                        subcommandID: PacketParser.parseSubcommandID(data, hexData),
                        subcommandReplyData: PacketParser.parseSubcommandReplyData(
                            data,
                            hexData
                        ),
                        deviceInfo: PacketParser.parseDeviceInfo(data, hexData),
                    };
                }

                if (reportId === 0x30) {
                    const accelerometers = PacketParser.parseAccelerometers(
                        data,
                        hexData
                    );
                    const gyroscopes = PacketParser.parseGyroscopes(data, hexData);
                    const rps = PacketParser.calculateActualGyroscope(
                        gyroscopes.map((g) => g.map((v) => v.rps))
                    );
                    const dps = PacketParser.calculateActualGyroscope(
                        gyroscopes.map((g) => g.map((v) => v.dps))
                    );
                    const acc = PacketParser.calculateActualAccelerometer(
                        accelerometers.map((a) => [a.x.acc, a.y.acc, a.z.acc])
                    );
                    const quaternion = PacketParser.toQuaternion(
                        rps,
                        acc,
                        device.productId
                    );

                    packet = {
                        ...packet,
                        accelerometers,
                        gyroscopes,
                        actualAccelerometer: acc,
                        actualGyroscope: {
                            dps: dps,
                            rps: rps,
                        },
                        actualOrientation: PacketParser.toEulerAngles(
                            rps,
                            acc,
                            device.productId
                        ),
                        actualOrientationQuaternion: PacketParser.toEulerAnglesQuaternion(
                            quaternion
                        ),
                        quaternion: quaternion,
                    };
                }
                break;
            }
        }
        if (packet.deviceInfo?.type) {
            this._receiveDeviceInfo(packet.deviceInfo);
        }
        if (packet.batteryLevel?.level) {
            this._receiveBatteryLevel(packet.batteryLevel);
        }
        this._receiveInputEvent(packet);
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

export { parseDevice, connectedDevices };