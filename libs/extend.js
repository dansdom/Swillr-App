// creates an extend method on an object ala the jQuery extend method
// http://onemoredigit.com/post/1527191998/extending-objects-in-node-js
exports.Extend = function(location) {
	
	Object.defineProperty(Object.prototype, 'extend', {
	    enumerable: false,
	    value: function(from) {
	        var props = Object.getOwnPropertyNames(from);
	        var dest = this;
	        props.forEach(function(name) {
	            if (name in dest) {
	                var destination = Object.getOwnPropertyDescriptor(from, name);
	                Object.defineProperty(dest, name, destination);
	            }
	        });
	        return this;
	    }
	});
	
};