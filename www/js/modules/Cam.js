function Cam() {
	this.initHandlers();

	this.options = {
		quality: 75,
		destinationType: Camera.DestinationType.FILE_URI,
		sourceType: Camera.PictureSourceType.CAMERA,
		correctOrientation: true
	};
}

Cam.prototype.initHandlers = function() {
	var that = this;

	$('#take-picture').click(function() {
		that.takePicture();
	});

	$('#remove-picture').click(function() {
		that.removePicture();
	});
};

Cam.prototype.takePicture = function() {
	var that = this;
	navigator.camera.getPicture(function(imageData) {
		// console.log('getPicture success!');
		// console.log(imageData);
		window.resolveLocalFileSystemURL(imageData, function(fileEntry) {
			// console.log('resolveLocalFileSystemURL success!');
			// console.log(fileEntry.toURL());
			// that.picReady(fileEntry.toURL());
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
				// console.log('requestFileSystem success!');
				fileSys.root.getDirectory("onePhoto", {create: true, exclusive: false}, function(dir) {
					// console.log('getDirectory success!');
					var time = new Date().getTime();
					fileEntry.copyTo(dir, "photo-"+time+".jpg", function(newFileEntry) {
						console.log('Picture succesfully copied');
						that.picReady(newFileEntry.toURL().replace('temporary','persistent'));
					}, function(e) {
						console.log('Error copying file');
						console.log(e);
					});
				}, function(e) {
					console.log('Error getting directory');
					console.log(e);
				});
			}, function(e) {
				console.log('Error retrieving file system');
				console.log(e);
			});
		}, function(e) {
			console.log('Error resolving URL on local file system');
			console.log(e);
		});
	}, function(e) {
		console.log('Error getting picture');
		console.log(e);
	}, this.options);
};

Cam.prototype.picReady = function(path) {
	console.log(path);
	$('#picture').css('background-image', 'url("'+path+'")');
	$('#take-picture').css('boxShadow', '1px 1px 3px blue').animate({fontSize: '15px', padding: '5px', borderRadius: '3px'});
	$('#remove-picture').css('visibility', 'visible');
};

Cam.prototype.removePicture = function() {
	$('#picture').css('background-image','none');
	$('#take-picture').css('boxShadow', '5px 5px 5px blue').animate({fontSize: '75px', padding: '30px', borderRadius: '15px'});
	$('#remove-picture').css('visibility', 'hidden');
};