

var artnet = require('artnet');

artnet.connect('192.168.1.19');

export class Desk {

	constructor() {
		this.fixtures = [];
		this.effects = [];
	}

	registerFixtureInstance(instance) {
		this.fixtures.push(instance);
	}

	getFixtureById(id) {
		return this.fixtures.filter(function(item) {
			return item.id === id;
		})[0];
	}

	renderDMX() {

		var unis = {};

		function setDmxVal(uni, addr, val) {
			unis[uni] = unis[uni] || {};
			unis[uni][addr] = val;
		}


		this.fixtures.forEach(function(fix) {

			if(!fix._patch) {
				return;
			}
			var fixDmxValues = fix.getDmxValues();

			fixDmxValues.forEach(function(val, i) {
				setDmxVal(fix._patch.univers, fix._patch.dmx + i, val);
			});

		});



		return unis;

	}


	registerEffect(effect) {
		this.effects.push(effect);
	}

	run() {

		var self = this;
		setInterval(function() {

			var unis = self.renderDMX();
			artnet.set(unis[1]);
			artnet.send();

		}, 0);
	}

}
