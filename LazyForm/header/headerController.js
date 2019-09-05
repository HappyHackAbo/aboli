(function(ctx) {
    ctx.header.controller = function HeaderController(context) {
        if(!ctx.controllerList[this.constructor.name]) {
            ctx.controllerList[this.constructor.name] = this;
        }
        this.header = context;
    }
    ctx.header.controller.prototype.handle = function(data) {
        this.header.model.handle(data);
    }
    ctx.header.controller.prototype.receive = function(data) {
        this.header.view.update(data);
    }
})(LazyForm);