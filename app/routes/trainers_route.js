App.TrainersRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('trainer');
	}
});

App.TrainersIndexRoute = App.TrainersRoute.extend({
	afterModel: function(trainers, transition) {
		if (!trainers.get('length')) {
			this.transitionTo('trainers.new');
		}
	}
});