$(window).load(function() {

	function onDeviceReady() {
		console.log('cordova is working!');

		cam = new Cam();
	}

	document.addEventListener('deviceready', onDeviceReady, false);
	// onDeviceReady();

});