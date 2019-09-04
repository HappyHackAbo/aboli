(function() {
    this.Controller = function() {
        this.el = null;
        this.children = [];
    };
    Controller.prototype.getElement = function() {
        return this.el;
    }
    Controller.prototype.add = function(item) {
        this.children.push(item);
        this.el.appendChild(item.getElement());
        return this;
    }
})();