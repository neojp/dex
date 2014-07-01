var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_VIEW_LOOKUPS: true,
	LOG_ACTIVE_GENERATION: true,
	LOG_TRANSITIONS_INTERNAL: true,
	rootElement: '.Overflow',
	LSNamespace: 'pokedex'
});

App.ApplicationSerializer = DS.LSSerializer.extend();

App.ApplicationAdapter    = DS.LSAdapter.extend({
	namespace: App.get('LSNamespace')
});

// App.ApplicationStore = DS.Store.extend();

// var inflector = Ember.Inflector.inflector;
// inflector.uncountable('pokemon');