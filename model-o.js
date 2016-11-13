/*

	Simple model that supports shallow property change watchers

*/

const EventEmitter = require('wolfy87-eventemitter')

class Model_O extends EventEmitter {
	
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
				model.emit(key, newValue, oldValue, key)
			},
			enumerable: true
		})
	}
}

module.exports = Model_O