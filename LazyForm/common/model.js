(function() {
    this.Model = {
        prototype: {
            init: function() {

            }
        },
        create: function() {
            var model = Object.create(this);
            model.parent = this;
            model.prototype = model.fn = Object.create(this.prototype);
            return model;
        },
        init: function() {
            var instance = Object.create(this.prototype);
            instance.parent = this;
            instance.prototype = instance.fn = Object.create(this);
            instance.init.apply(instance, arguments);
            return instance;
        }
    };

    var User = this.Model.create();
    var user = User.init();
}).call(LazyForm);