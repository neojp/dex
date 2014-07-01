App.PokemonsController = Ember.ArrayController.extend({
	itemController: 'pokemon'

	// caught: function() {
	// 	return this.filterBy('isCaught', true).get('length');
	// }.property('@each.isCaught'),

	// remaining: function() {
	// 	return this.filterBy('isCaught', false).get('length');
	// }.property('@each.isCaught'),

	// inflection: function() {
	// 	var caught = this.filterBy('isCaught', true).get('length');
	// 	return caught === 1 ? '' : 's';
	// }.property('isCaught')
});

App.PokemonController = Ember.ObjectController.extend({
	needs: ['application'],

	currentTrainer: Ember.computed.alias('controllers.application.currentTrainer'),

	image: function() {
		return 'assets/sprites/' + this.get('number') + '.png';
	}.property(),

	isCaught: function(key, value) {
		var controller      = this;
		var pokemonId       = this.get('id');
		var trainer         = this.get('currentTrainer');
		var trainerId       = trainer.get('id');
		var trainerPokemons = trainer.get('pokemon');
		var pokemon         = trainerPokemons.findBy('pokemon', pokemonId);
		var isCaught        = !!pokemon;

		if (value !== undefined) {
			// checkbox is true and pokemon hasn't caught yet
			if (value && !isCaught) {
				pokemon = this.store.createRecord('caughtPokemon', {
					pokemon: pokemonId,
					trainer: trainer
				});
				pokemon.save().then(function() {
					trainerPokemons.pushObject(pokemon);
					trainer.save();
				});
			// remove pokemon
			} else if (!value && isCaught) {
				pokemon      = trainerPokemons.findBy('pokemon', pokemonId);
				var recordId = pokemon.get('id');

				pokemon.deleteRecord();
				pokemon.save().then(function() {
					controller.deletePokemonFromLStorage(trainerId, recordId);
				});
			}
		}

		return !!isCaught;
	}.property('currentTrainer.pokemon.@each'),

	deletePokemonFromLStorage: function(trainerId, recordId) {
		var namespace = App.get('LSNamespace');
		var json = JSON.parse(localStorage.getItem(namespace));
		json.trainer.records[trainerId].pokemon = _.without(json.trainer.records[trainerId].pokemon, recordId);
		json = JSON.stringify(json);
		localStorage.setItem(namespace, json);
	}
});