(function() {
    this.LazyForm = function() {
        Controller.call(this);
        this.init();
    };
    inheritProto(LazyForm, Controller);
    LazyForm.prototype.init = function() {
        this.el = document.createElement('div');
        this.el.className = 'home';
    }
    LazyForm.prototype.render = function() {
        document.body.appendChild(this.getElement());
    }
})();