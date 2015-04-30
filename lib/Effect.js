

class EffectParameter {

}


export class Effect {

	constructor() {
		this.fixtures = [];
	}

	static init(config) {
		var instance = new this();

		desk.registerEffect(instance);


		config.fixtures.forEach(function(id) {
			instance.fixtures.push(desk.getFixtureById(id));
		});

		instance.parameter = config.parameter;


		return instance;
	}


	trigger(index) {
		var self = this;

		var anz = this.fixtures.length;




		this.fixtures.forEach(function(fix, i) {

			var pos = index + i/anz;

			fix.parameters[self.parameter].value = ((0.5 * Math.sin(pos * 2 * Math.PI) + 0.5) * 255);

			//fix.parameters[self.parameter].value = Math.round(index) * 255;


		});
	}

	run() {
		var self = this;
		var bpm = 60;
		var bps = bpm / 60;

		var frames = bps;


		var framespmilli = frames/100;

		console.log(framespmilli)

		var frame = 0;
		setInterval(function() {
			self.trigger(frame/frames);
			frame = frame + framespmilli;
			if(frame >= frames) { frame = 0; }
		}, 10);

	}

}
