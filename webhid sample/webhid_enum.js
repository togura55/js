// https://wicg.github.io/webhid/


//
// Device Enumeration
//
dictionary HIDDeviceFilter {
    unsigned long vendorId;
    unsigned short productId;
    unsigned short usagePage;
    unsigned short usage;
};

dictionary HIDDeviceRequestOptions {
    required sequence<HIDDeviceFilter> filters;
};

[
    Exposed=Window,
    SecureContext
]
interface HID : EventTarget {
    attribute EventHandler onconnect;
    attribute EventHandler ondisconnect;
    Promise<sequence<HIDDevice>> getDevices();
    Promise<sequence<HIDDevice>> requestDevice(
        HIDDeviceRequestOptions options);
};

[SecureContext] partial interface Navigator {
    [SameObject] readonly attribute HID hid;
};

//
// EXAMPLE 1
// Retrieve devices and log the device names to the console.
//

document.addEventListener('DOMContentLoaded', async () => {
  let devices = await navigator.hid.getDevices();
  devices.forEach(device => {
    console.log(`HID: ${device.productName}`);
  });
});
Register event listeners for connection and disconnection of HID devices.

navigator.hid.addEventListener('connect', ({device}) => {
  console.log(`HID connected: ${device.productName}`);
});

navigator.hid.addEventListener('disconnect', ({device}) => {
  console.log(`HID disconnected: ${device.productName}`);
});
Devices are not accessible through getDevices() and will not generate connection events until permission has been granted to access the device. The page may request permission using requestDevice(). In this example, the page requests access to a device with vendor ID 0xABCD, product ID 0x1234. The device must also have a collection with usage page Consumer (0x0C) and usage ID Consumer Control (0x01).

let requestButton = document.getElementById("request-hid-device");
requestButton.addEventListener("click", async () => {
  let device;
  try {
    const devices = await navigator.hid.requestDevice({
      filters: [
        {
          vendorId: 0xabcd,
          productId: 0x1234,
          usagePage: 0x0c,
          usage: 0x01,
        },
      ],
    });
    device = devices[0];
  } catch (error) {
    console.log("An error occurred.");
  }

  if (!device) {
    console.log("No device was selected.");
  } else {
    console.log(`HID: ${device.productName}`);
  }
});

/*
A HIDDevice device is a matching device for a HIDDeviceFilter filter if the following steps return match:

If filter.vendorId is present and device.vendorId does not equal filter.vendorId, return mismatch.
If filter.productId is present and device.productId does not equal filter.productId, return mismatch.
If filter.usagePage is present, iterate over the HIDCollectionInfo collections in device.collections. If there is no matching collection, return mismatch.
Return match.
A HIDCollectionInfo collection is a matching collection for a HIDDeviceFilter filter if the following steps return match:

If filter.usagePage is present and collection.usagePage does not equal filter.usagePage, return mismatch.
If filter.usage is present and collection.usage does not equal filter.usage, return mismatch.
Return match.
A HIDDeviceFilter filter is valid if the following steps return valid:

If filter.productId is present and filter.vendorId is not present, return invalid.
If filter.usage is present and filter.usagePage is not present, return invalid.
Return valid.
The UA MUST be able to enumerate all devices attached to the system. It is not required to perform this work each time an algorithm requests an enumeration. The UA MAY cache the result of the first enumeration it performs and then begin monitoring for device connection and disconnection events, adding connected devices to its cached enumeration and removing disconnected devices. This mode of operation is preferred as it reduces the number of operating system calls.
*/

//
// Events
//
dictionary HIDConnectionEventInit : EventInit {
    required HIDDevice device;
};

[
    Exposed=Window,
    SecureContext
] interface HIDConnectionEvent : Event {
    constructor(DOMString type, HIDConnectionEventInit eventInitDict);
    [SameObject] readonly attribute HIDDevice device;
};

dictionary HIDInputReportEventInit : EventInit {
    required HIDDevice device;
    required octet reportId;
    required DataView data;
};

[
    Exposed=Window,
    SecureContext
] interface HIDInputReportEvent : Event {
    constructor(DOMString type, HIDInputReportEventInit eventInitDict);
    [SameObject] readonly attribute HIDDevice device;
    readonly attribute octet reportId;
    readonly attribute DataView data;
};


//
// HID Collection and Report Information
//
enum HIDUnitSystem {
    "none", "si-linear", "si-rotation", "english-linear",
    "english-rotation", "vendor-defined", "reserved"
};

dictionary HIDReportItem {
    boolean isAbsolute;
    boolean isArray;
    boolean isBufferedBytes;
    boolean isConstant;
    boolean isLinear;
    boolean isRange;
    boolean isVolatile;
    boolean hasNull;
    boolean hasPreferredState;
    boolean wrap;
    sequence<unsigned long> usages;
    unsigned long usageMinimum;
    unsigned long usageMaximum;
    unsigned short reportSize;
    unsigned short reportCount;
    byte unitExponent;
    HIDUnitSystem unitSystem;
    byte unitFactorLengthExponent;
    byte unitFactorMassExponent;
    byte unitFactorTimeExponent;
    byte unitFactorTemperatureExponent;
    byte unitFactorCurrentExponent;
    byte unitFactorLuminousIntensityExponent;
    long logicalMinimum;
    long logicalMaximum;
    long physicalMinimum;
    long physicalMaximum;
    sequence<DOMString> strings;
};

dictionary HIDReportInfo {
    octet reportId;
    sequence<HIDReportItem> items;
};

dictionary HIDCollectionInfo {
    unsigned short usagePage;
    unsigned short usage;
    octet type;
    sequence<HIDCollectionInfo> children;
    sequence<HIDReportInfo> inputReports;
    sequence<HIDReportInfo> outputReports;
    sequence<HIDReportInfo> featureReports;
};


//
// Device Usage
//
[
    Exposed=Window,
    SecureContext
] interface HIDDevice : EventTarget {
    attribute EventHandler oninputreport;
    readonly attribute boolean opened;
    readonly attribute unsigned short vendorId;
    readonly attribute unsigned short productId;
    readonly attribute DOMString productName;
    readonly attribute FrozenArray<HIDCollectionInfo> collections;
    Promise<undefined> open();
    Promise<undefined> close();
    Promise<undefined> sendReport([EnforceRange] octet reportId, BufferSource data);
    Promise<undefined> sendFeatureReport([EnforceRange] octet reportId, BufferSource data);
    Promise<DataView> receiveFeatureReport([EnforceRange] octet reportId);
};



/*
6. Integrations

6.1 Permissions Policy
This specification defines a feature that controls whether the hid attribute is exposed on the Navigator object.

The feature name for this feature is "hid".

The default allowlist for this feature is 'self'.

7. Conformance
As well as sections marked as non-normative, all authoring guidelines, diagrams, examples, and notes in this specification are non-normative. Everything else in this specification is normative.

The key words MAY and MUST in this document are to be interpreted as described in BCP 14 [RFC2119] [RFC8174] when, and only when, they appear in all capitals, as shown here.
*/