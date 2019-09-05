(function() {
    this.LazyForm = function(opt) {
        Item.call(this, opt);
        this.init();
    };
    inheritProto(LazyForm, Item);
    LazyForm.controllerList = {};
    LazyForm.modelList = {};
    LazyForm.prototype.render = function() {
        document.body.appendChild(this.getElement());
    }
})();