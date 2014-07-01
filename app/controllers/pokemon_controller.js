App.PokemonsController = Ember.ArrayController.extend({
	needs: ['application'],

	currentTrainer: Ember.computed.alias('controllers.application.currentTrainer'),

	deletePokemonFromLStorage: function(trainerId, recordId) {
		var namespace = App.get('LSNamespace');
		var json = JSON.parse(localStorage.getItem(namespace));
		json.trainer.records[trainerId].pokemon = _.without(json.trainer.records[trainerId].pokemon, recordId);
		json = JSON.stringify(json);
		localStorage.setItem(namespace, json);
	},

	caught: Ember.computed.alias('currentTrainer.pokemon.length'),

	remaining: function() {
		var remaining = this.get('pokemons.length') - this.get('caught');
		return remaining || 0;
	}.property('pokemons', 'caught')
});

App.PokemonListItemView = Ember.ListItemView.extend({
	templateName: 'pokemon/item',

	currentTrainer: Ember.computed.alias('controller.currentTrainer'),

	click: function(e) {
		console.log(this);
	},

	isCaught: function(key, value) {
		var controller      = this.get('controller');
		var pokemonId       = this.get('context.id');
		var trainer         = this.get('currentTrainer');
		var trainerId       = trainer.get('id');
		var trainerPokemons = trainer.get('pokemon');
		var pokemon         = trainerPokemons.findBy('pokemon', pokemonId);
		var isCaught        = !!pokemon;

		if (value !== undefined) {
			// checkbox is true and pokemon hasn't caught yet
			if (value && !isCaught) {
				pokemon = controller.store.createRecord('caughtPokemon', {
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
	}.property('currentTrainer.pokemon.@each', 'context.id'),

	image: function() {
		return 'assets/sprites/' + this.get('number') + '.png';
	}.property('number'),

	number: Ember.computed.alias('context.num'),
	name: Ember.computed.alias('context.species')
});

App.PokemonListView = Ember.ListView.extend({
	height: 500,
	rowHeight: 150,

	itemViewClass: 'pokemonListItem',

	$window: $(window),
	$app: null,

	onResizeWindow: function() {
		var view = this;
		this.get('$window').on('resize.pokemonListView', function() {
			Ember.run(function() {
				view.resizeHeight();
			});
		});
	}.on('didInsertElement'),

	offResizeWindow: function() {
		this.get('$window').off('resize.pokemonListView');
	}.on('willDestroyElement'),

	resizeHeight: function(value) {
		var $app   = this.get('$app');

		if (!$app) {
			$app = $('#app');
			this.set('$app', $app);
		}

		var top    = $app.height() + $app.offset().top;
		var height = this.get('$window').height() - top;
		this.set('height', height);
	}.on('didInsertElement')
});