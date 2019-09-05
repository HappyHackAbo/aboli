(function(ctx) {
    ctx.content = function Content(data) {
        Item.call(this);
        this.data = data;
        this.view = new ctx.content.view(this);
        this.controller = new ctx.content.controller(this);
        this.model = new ctx.content.model(this);
        this.init();
    }
    inheritProto(ctx.content, Item);
    ctx.content.prototype.init = function() {
        this.view.init(this.data);
    }
    ctx.content.prototype.getElement = function() {
        return this.view.el;
    }
})(LazyForm);