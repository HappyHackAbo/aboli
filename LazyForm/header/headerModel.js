(function(ctx) {
    ctx.header.model = function HeaderModel(context) {
        if(!ctx.modelList[this.constructor.name]) {
            ctx.modelList[this.constructor.name] = this;
        }
        this.header = context;
    }
    ctx.header.model.prototype.handle = function(data) {
        for(var i = 0, len = data.length; i < len; i++) {
            data[i].icon = 'lazyform-' + data[i].icon;
        }
        this.noticeController(data);
    }
    ctx.header.model.prototype.noticeController = function(data) {
        this.header.controller.receive(data);
    }
})(LazyForm);