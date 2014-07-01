App.ApplicationRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		controller.setupTrainer();
	}
});