App.CaughtPokemon = DS.Model.extend({
	pokemon: DS.attr('string'),
	trainer: DS.belongsTo('trainer')
});