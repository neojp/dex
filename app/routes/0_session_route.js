App.SessionRoute = Ember.Route.extend({
	redirect: function() {
		// console.log('redirect 1');
		var controller = this.controllerFor('application');
		controller.setupTrainer(function(trainer) {
			// console.log('redirect 2', trainer);
			if (!trainer) {
				console.info('transition to trainers');
				controller.transitionToRoute('trainers');
			} else {
				console.info('transition to pokemons');
				controller.transitionToRoute('pokemons');
			}
		});
	}
});