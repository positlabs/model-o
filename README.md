# model-o

Simple observable model. Fires change events when values are assigned. Get excited!

[View the demo](https://positlabs.github.io/model-o/)

## usage

```javascript

	var model = new Model_O({
		str: 'hello',
		obj: {
			a: 'a' // NOTE: unwatchable
		},
		subModel: new Model_O({
			a: 'a' // watchable
		}),
		bool: true,
		num: 123.4567,
		arr: [1, 2, 3, 4, 5]
	})

	console.log(model)

	var onChange = function(newval, oldval, key){
		console.log(key, 'newval: ' + newval + ', oldval: ' + oldval)
	}
	model.on('str', onChange)
	model.str = 'asdf'
	model.str += 'asdf'

	model.subModel.on('a', onChange)
	model.subModel.a = 'A'

	model.on('arr', onChange)
	model.arr = model.arr.concat('extra')

```