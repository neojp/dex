App.Router = Ember.Router.extend({
	rootURL: '/dex/'
});

App.Router.map(function() {
	this.route('index', { path: '/' });

	this.resource('trainers', { path: '/trainer' }, function() {
		this.route('new');
	});

	this.resource('pokemons', { path: '/pokedex' });
});