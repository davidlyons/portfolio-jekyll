(function() {

	var container = document.getElementById( 'header-bg' );

	var body = document.querySelector('body');
	var bgColor = body.classList.contains('dark') ? 0x333333 : 0xffffff;
	var wireColor = body.classList.contains('dark') ? 0x444444 : 0xdddddd;

	var scene = new THREE.Scene();
	scene.background = new THREE.Color( bgColor );

	var header = document.querySelector('header');
	var height = header.offsetHeight - 1;

	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, height );
	container.appendChild( renderer.domElement );

	var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / height, .01, 1000 );
	camera.position.set( 0, 0, 1.8 );

	// -----------------------------------------------------------------

	var textureLoader = new THREE.TextureLoader();

	var sphereGeo = new THREE.SphereBufferGeometry( 2, 32, 32 );

	var sphereMat = window.sphereMat = new THREE.MeshBasicMaterial({
		color: wireColor,
		alphaMap: textureLoader.load('/header-bg.png'),
		side: THREE.BackSide,
		transparent: true,
		opacity: 0.5
	});

	sphereMat.alphaMap.repeat.set( 24, 12 );
	sphereMat.alphaMap.wrapS = sphereMat.alphaMap.wrapT = THREE.RepeatWrapping;

	var sphere = new THREE.Mesh( sphereGeo, sphereMat );
	sphere.position.y = -0.2;
	scene.add( sphere );

	// -----------------------------------------------------------------

	var mouse = new THREE.Vector2();

	var sphereTarget = new THREE.Euler();

	var xrad = THREE.Math.degToRad(30);
	var yrad = THREE.Math.degToRad(10);

	header.addEventListener('mousemove', mousemove, false);
	function mousemove(e){
		// NDC -1 to 1
		var rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ( e.clientX - rect.left ) / rect.width * 2 - 1;
		mouse.y = ( e.clientY - rect.top ) / rect.height * -2 + 1;

		sphereTarget.y = mouse.x * xrad;
		sphereTarget.x = - mouse.y * yrad;
	}

	window.addEventListener( 'resize', resize, false );
	function resize() {
		height = header.offsetHeight - 1;
		camera.aspect = window.innerWidth / height;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, height );
	}

	renderer.setAnimationLoop( loop );

	function loop() {

		lerp( sphere.rotation, 'x', sphereTarget.x );
		lerp( sphere.rotation, 'y', sphereTarget.y );

		renderer.render( scene, camera );

	}

	function lerp( object, prop, destination ) {
		if (object && object[prop] !== destination) {
			object[prop] += (destination - object[prop]) * 0.1;

			if (Math.abs(destination - object[prop]) < 0.001) {
				object[prop] = destination;
			}
		}
	}

})();


//# sourceMappingURL=app.js.map