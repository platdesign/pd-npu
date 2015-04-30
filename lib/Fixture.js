

class FixtureParameter {

	constructor(def) {
		this.value = 0;
	}

	getDmxValue() {
		return Math.abs(Math.floor(this.value));
	}

}



export class Fixture {

	constructor() {
		this.parameters = {};
	}



	static specify(def) {

		return class _Fixture extends this {
			static init() {
				var instance = new this();

				Object.keys(def.parameters || {}).forEach(function(name) {
					instance._registerParameter(name, def.parameters[name]);
				});


				desk.registerFixtureInstance(instance);



				return instance;
			}
		}

	}


	_registerParameter(name, def) {
		this.parameters[name] = new FixtureParameter(def);
	}


	patch(patch) {
		this._patch = patch;
		this.id = patch.id;
	}

	getDmxValues() {
		if(!this.patch) {
			return [];
		}
		var values = [];
		var parameters = this.parameters;

		Object.keys(parameters).forEach(function(name) {
			values.push( parameters[name].getDmxValue() );
		});
		return values;
	}

}
