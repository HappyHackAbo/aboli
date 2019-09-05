function Item(opt) {
    opt = opt || {};
    this.el;
    this.children = [];
    this.className = opt.className || '';
    this.tagName = opt.tagName || 'div';
}
Item.prototype.init = function() {
    this.el = document.createElement(this.tagName);
    if(this.className) {
        this.el.className = this.className;
    }
    return this;
}
Item.prototype.setElement = function(opt) {
    this.el = document.createElement(opt.tagName || 'div');
    if(opt.className) {
        this.className = opt.className;
        this.el.className = this.className;
    }
}
Item.prototype.add = function(item) {
    this.children.push(item);
    this.el.appendChild(item.getElement());
    return this;
}
Item.prototype.getElement = function() {
    return this.el;
}