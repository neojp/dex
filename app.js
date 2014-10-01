(function($, $document, $window, undefined) {

var $canvas       = $('#canvas');
var pokemons      = {};
var caughtPokemon = {};
var formePokemon  = {};
var typesData     = {};

var Tpl = {
	stats  : $('script[data-tpl="stats"]').html(),
	pokedex: $('script[data-tpl="pokedex"]').html(),
	pokemon: $('script[data-tpl="pokemon"]').html(),
};

$window.on('load', $.proxy(init));


//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


function init() {
	// get local data
	getLocalData(function(storageData) {
		// render templates
		renderTpl();

		// bind events
		bindEvents();

		// fade content at end
		setTimeout(function() {
			$canvas.addClass('show');
		}, 0);
	});
}

function getLocalData(cb) {
	cb = $.isFunction(cb) ? cb : $.noop;

	// get local data
	localforage.getItem('dex2-caughtPokemon').then(function(storageData) {
		if (storageData) {
			caughtPokemon = storageData.caughtPokemon || {};
			formePokemon  = storageData.formePokemon || {};
		}

		cb();
	});
}

function bindEvents() {
	$canvas.on('mousedown', 'img', function(e) {
		e.preventDefault();
	});

	$canvas.on('change', 'input[type="checkbox"]', function(e) {
		e.preventDefault();

		var $input = $(this);
		var id     = $input.data('id');
		var caught = false;

		// forme pokemon
		if (!pokemons[id]) {
			if (formePokemon[id]) {
				delete formePokemon[id];
				delete caughtPokemon[id];
			} else {
				formePokemon[id] = id;
				caughtPokemon[id] = id;
				caught = true;
			}

		// regular pokemon
		} else {
			if (caughtPokemon[id]) {
				delete caughtPokemon[id];
			} else {
				caughtPokemon[id] = id;
				caught = true;
			}
		}

		$input.prop('checked', caught);
		$input.closest('li').toggleClass('caught', caught);
		$('.pokedex-stats').html(renderStatsTpl());

		var saveData = {
			lastUpdated: (new Date()),
			totalPokemon: (_.size(caughtPokemon) - _.size(formePokemon)),
			caughtPokemon: caughtPokemon,
			formePokemon: formePokemon
		};

		localforage.setItem('dex2-caughtPokemon', saveData);
	});
}

function renderStatsTpl() {
	var forme     = _.size(formePokemon);
	var caught    = _.size(caughtPokemon) - forme;
	var total     = _.size(pokemons);
	var remaining = total - caught;

	console.log(forme, caught, total, pokemons, caughtPokemon, formePokemon);

	return _.template(Tpl.stats, {
		caught   : caught,
		remaining: remaining,
		total    : total
	});
}

function renderPokemonTpl() {
	var html = '';

	_.forEach(data, function(p, id) {
		if (p.num < 1 || p.num > 719) {
			delete data[id];
			return;
		}

		if (!p.forme) {
			pokemons[id] = p;
		}

		p.id = id;

		var types = _.map(p.types, function(t) {
			if (typesData[t]) {
				return typesData[t];
			}

			typesData[t] = {
				name: t,
				slug: slug(t.toLowerCase())
			};

			return typesData[t];
		});

		html += _.template(Tpl.pokemon, {
			caught: !!caughtPokemon[id],
			forme : !!p.forme ? slug(p.forme.toLowerCase()) : false,
			id    : p.id,
			name  : p.species,
			number: p.num,
			types : types
		});
	});

	return html;
}

function renderPokedexTpl() {
	var pokemonHtml = renderPokemonTpl();
	var statsHtml   = renderStatsTpl();

	return _.template(Tpl.pokedex, {
		stats: statsHtml,
		pokemons: pokemonHtml
	});
}

function renderTpl() {
	localforage.getItem('dex2-markup').then(function(tpl) {
		if (!tpl) {
			tpl = renderPokedexTpl();
		}

		$canvas.html(tpl);
	});
}

})(jQuery, jQuery(document), jQuery(window));
