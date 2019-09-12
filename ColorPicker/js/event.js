function Event() {
    this.bindEvent = [];
}
Event.prototype.addEvent = function(name, callback) {
    if(typeof callback !== 'function') return;
    var bExistEvent = false;
    var untieEvent = function() {
        if(window.removeEventListener) {
            this.element.removeEventListener(name, callback);
        } else if(window.detachEvent) {
            this.element.detachEvent('on' + name, callback);
        } else {
            this.element['on' + name] = null;
        }
    };
    for(var i = 0, len = this.bindEvent.length; i < len; i++) {
        if(this.bindEvent[i].name == name) {
            this.removeEvent(name);
            this.bindEvent[i].untie = untieEvent;
            this.bindEvent[i].event = callback;
            bExistEvent = true;
            break;
        }
    }
    if(window.addEventListener) {
        this.element.addEventListener(name, callback);
    } else if(window.attachEvent) {
        this.element.attachEvent('on' + name, callback);
    } else {
        this.element['on' + name] = callback;
    }
    if(!bExistEvent) {
        this.bindEvent.push({
            name: name,
            event: callback,
            untie: function() {
                if(window.removeEventListener) {
                    this.element.removeEventListener(name, callback);
                } else if(window.detachEvent) {
                    this.element.detachEvent('on' + name, callback);
                } else {
                    this.element['on' + name] = null;
                }
            }
        });
    }
}
Event.prototype.removeEvent = function(name) {
    if(typeof name === 'undefined' || name === '') return;
    //  从已绑定事件列表中剔除
    for(var i = 0, len = this.bindEvent.length; i < len; i++) {
        if(this.bindEvent[i].name == name) {
            this.bindEvent[i].untie.call(this);     //  移除绑定事件
            this.bindEvent.splice(i, 1);    //  从事件列表删除
            break;
        }
    }
}
Event.prototype.triggerEvent = function(name) {
    var callback = null;
    for(var i = 0, len = this.bindEvent.length; i < len; i++) {
        if(this.bindEvent[i].name === name) {
            callback = this.bindEvent[i].event;
        }
    }
    if(typeof callback === 'function') {
        callback.apply(this, [].slice.call(arguments).slice(1));
    }
}
