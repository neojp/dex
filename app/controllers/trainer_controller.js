App.TrainersIndexController = Ember.ArrayController.extend({
	itemController: 'trainer'
});

App.TrainerController = Ember.ObjectController.extend({
	needs: ['application'],

	currentTrainer: Ember.computed.alias('controllers.application.currentTrainer'),

	isCurrentTrainer: function() {
		return this.get('id') === this.get('currentTrainer.id');
	}.property('currentTrainer'),

	actions: {
		choose: function(record) {
			this.get('controllers.application').setTrainer(record);
		},

		delete: function(record) {
			record.destroyRecord();

			if (this.get('isCurrentTrainer')) {
				this.get('controllers.application').setTrainer(null);
			}
		}
	}
});

App.TrainersNewController = Ember.Controller.extend({
	needs: ['application'],

	gender: 'boy',
	isBoy : Ember.computed.equal('gender', 'boy'),
	isGirl: Ember.computed.equal('gender', 'girl'),

	game: null,

	actions: {
		setGender: function(gender) {
			this.set('gender', gender);
		},

		createTrainer: function() {
			var trainer = this.store.createRecord('trainer', {
				name: this.get('name'),
				trainerId: this.get('id'),
				gender: this.get('gender'),
				game: this.get('game')
			});

			trainer.save();

			this.transitionToRoute('trainers');
		}
	}
});