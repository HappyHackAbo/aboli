(function(ctx) {
    ctx.content.model = function ContentModel(context) {
        if(!ctx.modelList[this.constructor.name]) {
            ctx.modelList[this.constructor.name] = this;
        }
        this.content = context;
        this.val = 2;
    }
    ctx.content.model.prototype.handle = function(data) {
        for(var i = 0, len = data.length; i < len; i++) {
            data[i].className = 'tab-item';
            if(i == this.val) {
                data[i].className += ' active';
            }
            if(i == this.val - 1) {
                data[i].className += ' active-left';
            }
            if(i == this.val + 1) {
                data[i].className += ' active-right';
            }
        }
        this.noticeController(data);
    }
    ctx.content.model.prototype.noticeController = function(data) {
        this.content.controller.receive(data);
    }
})(LazyForm);