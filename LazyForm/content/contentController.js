(function(ctx) {
    ctx.content.controller = function ContentController(context) {
        if(!ctx.controllerList[this.constructor.name]) {
            ctx.controllerList[this.constructor.name] = this;
        }
        this.content = context;
    }
    ctx.content.controller.prototype.handle = function(data) {
        this.content.model.handle(data);
    }
    ctx.content.controller.prototype.receive = function(data) {
        this.content.view.update(data);
    }
})(LazyForm);