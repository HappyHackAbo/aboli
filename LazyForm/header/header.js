(function(ctx) {
    ctx.header = function Header(data) {
        Item.call(this);
        this.data = data;
        this.model = new ctx.header.model(this);
        this.controller = new ctx.header.controller(this);
        this.view = new ctx.header.view(this);
        this.init();
    }
    inheritProto(ctx.header, Item);
    ctx.header.prototype.init = function() {
        this.view.init(this.data);
    }
    ctx.header.prototype.getElement = function() {
        return this.view.el;
    }
})(LazyForm);