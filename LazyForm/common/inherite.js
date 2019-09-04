function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function inheritProto(subclass, superclass) {
    subclass.prototype = inheritObject(superclass.prototype);
    subclass.prototype.constructor = subclass;
}