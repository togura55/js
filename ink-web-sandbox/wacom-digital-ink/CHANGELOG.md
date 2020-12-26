# digital-ink ChangeLog

## 1.2.0

_2020-09-01_

### Breaking Changes
- _InkController_ - interface is updated, registerTouches(changedTouches) method is replaced with registerInputProvider(pointerID, isPrimary), getInkBuilder(changedTouches) with getInkBuilder(pointerID), implementation update is required
- _InkBuilderAbstract_ - property touchID is renamed to pointerID

### Updates
- _InputListener_ - based on PointerEvent only, fallback class is provided when PointerEvent is not available which implementation is based on MouseEvent and TouchEvent
- _SensorPoint_ - PointerEvent based InputListener extends SensorPoint with coalesced and predicted points, when available
- _Matrix_ - provides access to additional properties like scaleX, translateX, etc.
- _InkPath2D_ - 2D ink path type implemented and integrated

### Bugfixes
- _PathPoint_ - transform properly applied rotation when available

## 1.1.0

_2020-08-11_

### Bugfixes

- _InkModel_ - provide proper strokes order after manipulations
- _StrokeDrawContext_ - randomSeed fix (int number instead long)
- _StrokeRendererGL_ - renderer configuration color update, overrides path color
- _InkGLContext_ - blend mode MIN fixed, blendMode as property instead method
- _Matrix_ - fromMatrix method do not recreates Matrix when data is Matrix instance
- _PathPointContext_ - improved attributes values analyse, added suppot for tocuh devices with radius range (0, 1)
- _CurvatureBasedInterpolator_ - rotation bug-fix, ts and tf aplyed

### Updates

- _Spline_ - transfrom functionallity provided
- _Stroke_ - transform functionality updated - transform underlying spline and path if available
- _Intersector_ - intersect2 method renamed to intersectSegmentation, doc update
- _InkContext_ - drawSprite is replaced from drawSpritesBatch (batching points sprites)
- _InputDevice_ - decouple sensor point building from ink builder, InputDevice handles building, validation and provides sensor layout as string array
- _InkCanvas2D_ - context attributes support (Layers inherits canvas attributes)

## 1.0.0

_2020-07-01_

- First release
