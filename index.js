


import {Desk} from './lib/Desk';
var desk = global.desk = new Desk();

import {Fixture} from './lib/Fixture';
import {Effect} from './lib/Effect';





export function run() {


	var LED = Fixture.specify({
		name: 'LED RGB',
		parameters: {
			color1: {
				dmx: 1,
				name: 'red'
			},
			color2: {
				dmx: 2,
				name: 'green',
			},
			color3: {
				dmx: 3,
				name: 'blue'
			}
		}
	});


	for(var i=0; i<16; i++) {
		LED.init().patch({
			id: i+1,
			univers: 1,
			dmx: i*3 + 1
		});
	}



	var effect = Effect.init({
		fixtures: [1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		parameter: 'color1'
	});
	effect.running = true;
	effect.speed = 60;

	effect.run();

	desk.run();

}


