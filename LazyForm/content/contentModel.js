(function(ctx) {
    ctx.content.model = function ContentModel(context) {
        if(!ctx.modelList[this.constructor.name]) {
            ctx.modelList[this.constructor.name] = this;
        }
        this.content = context;
    }
    ctx.content.model.prototype.handle = function(data) {
        this.noticeController(data);
    }
    ctx.content.model.prototype.noticeController = function(data) {
        this.content.controller.receive(data);
    }
})(LazyForm);