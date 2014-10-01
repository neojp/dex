App.PokemonsRoute = App.SessionRoute.extend({
	setupController: function(controller, model) {
		// return this.store.find('pokemon');
		var request = $.ajax('data_new/pokedex.js', {
			dataType: 'text',
			cache: true,
			success: function(data) {
				data = JSON5.parse(data);
				var pokemons = [];
				for(var key in data) {
					if (data.hasOwnProperty(key) && key !== "toString") {
						data[key].id = key;

						if (data[key].forme || data[key].num < 1 || data[key].num > 719) {
							continue;
						}

						pokemons.push(data[key]);
					}
				}
				controller.set('pokemons', pokemons);
			}
		});
	}
});