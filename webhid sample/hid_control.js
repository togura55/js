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


const parseDevice = async () => {
    try {
        // Prompt user to select a Hid device.
        const [device] = await navigator.hid.requestDevice({ filters });
        if (!device) {
            console.log(`No selected HID devices are found.`);
            return;
        }

        let outputStrings = `User selected ` + device.productName + ` is accessible via WebHID.`;
        console.log(outputStrings);
        var result = document.getElementById("resultDevices");
        result.innerHTML = outputStrings;
    } catch (error) {
        console.error(error.name, error.message);
    }
};

export { parseDevice };