dictionary PointerEventInit : MouseEventInit {
    long        pointerId = 0;
    double      width = 1;
    double      height = 1;
    float       pressure = 0;
    float       tangentialPressure = 0;
    long        tiltX;
    long        tiltY;
    long        twist = 0;
    double      altitudeAngle;
    double      azimuthAngle;
    DOMString   pointerType = "";
    boolean     isPrimary = false;
    sequence<PointerEvent> coalescedEvents = [];
    sequence<PointerEvent> predictedEvents = [];
};

[Exposed=Window]
interface PointerEvent : MouseEvent {
    constructor(DOMString type, optional PointerEventInit eventInitDict = {});
    readonly        attribute long        pointerId;
    readonly        attribute double      width;
    readonly        attribute double      height;
    readonly        attribute float       pressure;
    readonly        attribute float       tangentialPressure;
    readonly        attribute long        tiltX;
    readonly        attribute long        tiltY;
    readonly        attribute long        twist;
    readonly        attribute double      altitudeAngle;
    readonly        attribute double      azimuthAngle;
    readonly        attribute DOMString   pointerType;
    readonly        attribute boolean     isPrimary;
    [SecureContext] sequence<PointerEvent> getCoalescedEvents();
    sequence<PointerEvent> getPredictedEvents();
};