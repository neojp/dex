App.Trainer = DS.Model.extend({
	trainerId: DS.attr('number'),
	name     : DS.attr('string'),
	gender   : DS.attr('string'),
	game     : DS.attr('string'),
	pokemon  : DS.hasMany('caughtPokemon', { async: true }),

	gameTitle: function() {
		var titles = App.Trainer.GAME_TITLES;
		var id     = this.get('game');
		var title  = _.find(titles, { 'id': id });

		if ('title' in title) {
			return title.title;
		}

		return id;
	}.property('game'),

	pokemonLength: function() {
		return this.get('pokemon.length');
	}.property('pokemon.@each', 'pokemon.length')
});

App.Trainer.reopenClass({
	GAME_TITLES: [
		{ id: 'black', title: 'Pokemon Black' },
		{ id: 'white', title: 'Pokemon White' },
		{ id: 'black2', title: 'Pokemon Black 2' },
		{ id: 'white2', title: 'Pokemon White 2' },
		{ id: 'x', title: 'Pokemon X' },
		{ id: 'y', title: 'Pokemon Y' }
	]
});