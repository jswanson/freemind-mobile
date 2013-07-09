app.views.SignInView = Backbone.View.extend({

    render: function () {
        this.$el.empty();
        
        this.$el.html(this.template());

        return this;
    },

    events: {
        "click .back-button": "back",
        "click .home-button": "back"
    },

    back: function (event) {
        window.history.back();
        return false;
    }

});
