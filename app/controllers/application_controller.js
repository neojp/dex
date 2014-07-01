App.ApplicationController = Ember.Controller.extend({
	currentTrainer: null,

	setupTrainer: function(cb) {
		// console.log('setupTrainer', 1);
		cb = $.isFunction(cb) ? cb : $.noop;
		// console.log(cb);

		var controller = this;
		var trainer = this.get('currentTrainer');
		// console.log('setupTrainer', 2, trainer);

		if (trainer) {
			return cb(trainer);
		}

		var trainerId = convertType(localStorage.getItem('trainerId')) || null;
		// console.log('setupTrainer', '2x', trainerId);

		if (trainerId) {
			this.store.find('trainer', trainerId).then(function(record) {
				// console.info('setupTrainer', 3, record);
				controller.setTrainer(record);
				cb(record);
			}, function(reason) {
				// console.info('setupTrainer', 4, reason);
				controller.setTrainer(null);
				cb(null);
			});
		} else {
			// console.info('setupTrainer', 5);
			cb();
		}
	},

	setTrainer: function(trainer) {
		// console.info(trainer, trainer ? trainer.get('id') : 'nope');
		var trainerId = trainer ? trainer.get('id') : null;
		this.set('currentTrainer', trainer);
		// console.info(trainer, trainerId, this.get('currentTrainer'));

		if (trainerId) {
			localStorage.setItem('trainerId', trainerId);
		} else {
			localStorage.removeItem('trainerId');
		}
	},

	changedTrainer: function() {
		console.log('changed currentTrainer to ' + this.get('currentTrainer.id'));
	}.observes('currentTrainer')
});