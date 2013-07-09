app.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                         "home",
        "employees/:id":            "employeeDetails",
        "employees/:id/reports":    "reports",
        "employees/:id/map":        "map",
        "signin":                   "signin"
    },

    initialize: function () {
        app.slider = new PageSlider($('body'));

    },

    home: function () {
        console.debug("routes:home");
        // Since the home view never changes, we instantiate it and render it only once
        if (!app.homeView) {
            app.homeView = new app.views.HomeView();
            app.homeView.render();
        } else {
            console.log('reusing home view');
            app.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        app.slider.slidePage(app.homeView.$el);
    },

    employeeDetails: function (id) {
        console.debug("routes:employeeDetails");
        var employee = new app.models.Employee({ id: id });
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                app.slider.slidePage(new app.views.EmployeeView({model: data}).render().$el);
            }
        });
    },

    reports: function (id) {
        console.debug("routes:reports");
        var employee = new app.models.Employee({ id: id });
        employee.fetch({
            success: function (data) {
                // Note that we could also 'recycle' the same instance of EmployeeFullView
                // instead of creating new instances
                app.slider.slidePage(new app.views.ReportsView({model: data}).render().$el);
            }
        });
    },

    map: function (id) {
        console.debug("routes:maps");
        app.slider.slidePage(new app.views.MapView().render().$el);
    },
    
    signin: function () {
        console.debug("routes:signin");
        app.slider.slidePage(new app.views.SignInView().render().$el);
    }

});