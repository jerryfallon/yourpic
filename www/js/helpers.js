function bind(f, obj) {
	return function() {
		f.apply(obj, arguments);
	};
}
