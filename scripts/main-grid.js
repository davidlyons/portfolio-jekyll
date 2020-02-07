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

	var camera = new THREE.PerspectiveCamera( 30, window.innerWidth / height, 1, 10000 );
	camera.position.set( 0, 0, 1500 );

	// -----------------------------------------------------------------

	var OutlineShader = {

		uniforms: {
			offset: { type: 'f', value: 3.0 },
			color: { type: 'v3', value: new THREE.Color( wireColor ) },
			alpha: { type: 'f', value: 0.7 }
		},

		vertexShader: [

			"uniform float offset;",

			"void main() {",
			"  vec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );",
			"  gl_Position = projectionMatrix * pos;",
			"}"

		].join('\n'),

		fragmentShader: [

			"uniform vec3 color;",
			"uniform float alpha;",

			"void main() {",
			"  gl_FragColor = vec4( color, alpha );",
			"}"

		].join('\n')

	};

	// ----------------------------------------------------------

	var outlineMat = new THREE.ShaderMaterial({
		uniforms: THREE.UniformsUtils.clone( OutlineShader.uniforms ),
		vertexShader: OutlineShader.vertexShader,
		fragmentShader: OutlineShader.fragmentShader,
		side: THREE.BackSide,
		transparent: true
	});

	// ------------------------------------------------------------

	var sphereGeo = new THREE.SphereBufferGeometry( 20, 20, 10 );

	var sphereMat = window.sphereMat = new THREE.MeshBasicMaterial({
		color: bgColor
	});

	var xgrid = 30,
			ygrid = 9,
			zgrid = 10;

	for ( i = 0; i < xgrid; i ++ ) {
		for ( j = 0; j < ygrid; j ++ ) {
			for ( k = 0; k < zgrid; k ++ ) {

				var mesh = new THREE.Mesh( sphereGeo, sphereMat );

				x = 200 * ( i - xgrid / 2 );
				y = 200 * ( j - ygrid / 2 );
				z = 200 * ( k - zgrid / 2 );

				mesh.position.set( x, y, z );

				scene.add( mesh );

				var outline = new THREE.Mesh( sphereGeo, outlineMat );
				mesh.add( outline );

			}
		}
	}

	// -----------------------------------------------------------------

	var mouse = new THREE.Vector2();

	var cameraTarget = new THREE.Vector3();

	header.addEventListener('mousemove', mousemove, false);
	function mousemove(e){
		// NDC -1 to 1
		var rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ( e.clientX - rect.left ) / rect.width * 2 - 1;
		mouse.y = ( e.clientY - rect.top ) / rect.height * -2 + 1;

		cameraTarget.x = mouse.x * 500;
		cameraTarget.y = mouse.y * 200;
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

		lerp( camera.position, 'x', cameraTarget.x );
		lerp( camera.position, 'y', cameraTarget.y );

		renderer.render( scene, camera );

	}

	function lerp( object, prop, destination ) {
		if (object && object[prop] !== destination) {
			object[prop] += (destination - object[prop]) * 0.05;

			if (Math.abs(destination - object[prop]) < 0.001) {
				object[prop] = destination;
			}
		}
	}

})();

