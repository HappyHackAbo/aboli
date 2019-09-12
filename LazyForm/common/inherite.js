// function inheritObject(o) {
//     function F() {}
//     F.prototype = o;
//     return new F();
// }
if(typeof Object.create !== 'function') {
    Object.create = function(o) {
        function F() {};
        F.prototype = o;
        return new F();
    }
}

function inheritProto(subclass, superclass) {
    subclass.prototype = Object.create(superclass.prototype);
    subclass.prototype.constructor = subclass;
}