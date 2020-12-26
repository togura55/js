# dom-transformer

## Description

The Javascript library performs DOM nodes transformations based on browser DOMMatrix API. Expose transform event and pinch event.

## Register & Listen transform event

```javascript
let transformer = TransformEvent.register(DOMNode, TransformOptions);

DOMNode.addEventListener("transformstart", Function);
DOMNode.addEventListener("transform", Function);
DOMNode.addEventListener("transformend", Function);
```

### TransformOptions

| name            | type               | default            | description                                                                                    |
| --------------- | ------------------ | -----------------: | ---------------------------------------------------------------------------------------------- |
| translate       | boolean            | false              | Activate translate transform                                                                   |
| rotate          | boolean            | false              | Activate rotate transform                                                                      |
| scale           | boolean            | false              | Activate scale transform                                                                       |
| minWidth        | int                | 50                 | Scale transform width limitation                                                               |
| minHeight       | int                | 50                 | Scale transform height limitation                                                              |
| keepRatio       | boolean            | false              | Scale transform allows skew by default                                                         |
| translateHandle | HTMLElement        | registered DOMNode | Translate controller, defaults to monitored element                                            |
| rotateHandles   | Array<HTMLElement> |                    | Rotation controllers                                                                           |
| delta           | boolean            | false              | Delta transform also exist in event detail, by defaults only accumulated transform is reported |
| origin          | boolean            | false              | Transform is reported in view coordinate system, if oirgin transform is needed set this flag   |

### TransformEvent output (event.detail)

| name        | type         | description                                                                                                                                                                                              |
| ----------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type        | string       | Describes transformation type. Possible values: translate, scale, rotate, transform, where transform comes from complex operation.                                                                       |
| transform   | DOMMatrix    | Accumulated transform, value depends from 'origin' transform option, when origin is true - it is transform in origin coordinate system else is in view coordinate system.                                |
| delta       | DOMMatrix    | Delta transform. Activated from 'delta' transform option. Value depends from 'origin' transform option, when origin is true - it is delta in origin coordinate system else is in view coordinate system. |
| origin      | DOMPoint     | Transformation origin. Available only for transformstart event.                                                                                                                                          |

## Register & Listen pinch event

```javascript
let pincher = PinchEvent.register(DOMNode, PinchOptions);

DOMNode.addEventListener("pinchstart", Function);
DOMNode.addEventListener("pinch", Function);
DOMNode.addEventListener("pinchend", Function);
```

### PinchOptions

| name            | type               | default            | description       |
| --------------- | ------------------ | -----------------: | ------------------|
| rotate          | boolean            | false              | Enable rotatation |

### PinchEvent output (event.detail)

| name        | type        | description                                                 |
| ----------- | ----------- | ----------------------------------------------------------- |
| pin         | DOMPoint    | Point of interest - where pinch comes from                  |
| origin      | DOMPoint    | Transformation origin - where pinch starts from             |
| scale       | Scale       | Scale delta                                                 |
| rotation    | float       | Rotation delta angle in rad                                 |
| translation | Translation | Translation delta                                           |
| transform   | DOMMatrix   | Transform delta. Matrix based on all underlying properties. |
