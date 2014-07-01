App.PokemonsRoute = App.SessionRoute.extend({
	model: function() {
		return this.store.find('pokemon');
	}
});