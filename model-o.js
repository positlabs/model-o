/*

	Simple model that supports shallow property change watchers

*/

const Events = require('events').EventEmitter

class Model_O extends Events {
	
	constructor(obj){
		super()
		this._properties = Object.assign({}, obj) // clone just to be safe
		Object.keys(this._properties).forEach(key => {
			this.define(key, this._properties[key])
		})
	}
	
	toJSON(){
		return this._properties
	}

	define(key, defaultValue){
		
		this._properties[key] = defaultValue

		Object.defineProperty(this, key, {
			get(){ return this._properties[key] },
			set(newValue){
				// ignore if value is unchanged
				// only works for primitives
				if(newValue === this._properties[key]) return
				var oldValue = this._properties[key]
				this._properties[key] = newValue
				this.emit(key, newValue, oldValue, key)
			},
			enumerable: true
		})
	}
}

module.exports = Model_O
