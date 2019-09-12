function inheritObj(o) {
    function F() {};
    F.prototype = o;
    return new F();
}

function inheritProto(subclass, supclass) {
    subclass.prototype = inheritObj(supclass.prototype);
    subclass.prototype.constructor = subclass;
}

function extend(p, o) {
    for(var item in o) {
        if(!p.hasOwnProperty(item)) {
            p[item] = o[item];
        }
    }
}

function Container(className) {
    this.element = null;
    this.className = className || '';
    this.parent = null;
    this.children = [];
    this.init();
}
Container.prototype.init = function() {
    this.element = document.createElement(this.tagname || 'div');
    this.className && (this.element.className = this.className);
}
Container.prototype.getElement = function() {
    return this.element;
}
Container.prototype.add = function(item) {
    item.parent = this;
    this.children.push(item);
    this.element.appendChild(item.getElement());
    return this;
}

function Item(className, tagname) {
    this.tagname = tagname || 'div';
    Container.call(this, className);
    delete this.children;
}
inheritProto(Item, Container);
Item.prototype.add = function() {
    throw new Error('[[Type Item]] can not add any other item');
}

