(function(){

var libraryLoader = {};

var librarySystem = function (libName, dependenciesArray, callback) {
	if (arguments.length > 1) {
	// create library
		if (dependenciesArray.length > 0) {

			// create with dependencies
			var storageArray = []; 

			for (var i = 0; i < dependenciesArray.length; i++) {
				storageArray.push(libraryLoader[dependenciesArray[i]]);
			}

			libraryLoader[libName] = callback.apply(null, storageArray);

		} else {

			// create without dependencies
			libraryLoader[libName] = callback();
		}

	} else {

		// get library
		return libraryLoader[libName];
	}
};

window.librarySystem = librarySystem;

})();

// EXAMPLE 1 WITH ONE DEPENDENCY:

librarySystem('dependency', [], function() {
  return 'loaded dependency';
});

librarySystem('app', ['dependency'], function(dependency) {
  return 'app with ' + dependency;
});

librarySystem('app');
// ==> "app with loaded dependency"

// EXAMPLE 2 WITH MULTIPLE DEPENDENCIES

librarySystem('name', [], function() {
  return 'Ben';
});

librarySystem('dependency2', [], function() {
  return 'a library system with dependencies';
});

librarySystem('anotherApp', ['name', 'dependency2'], function(name, dependency2) {
  return name + ' is now using ' + dependency2;
});

librarySystem('anotherApp');
// ==> "Ben is now using a library system with dependencies"
