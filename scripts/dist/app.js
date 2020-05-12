"use strict";

(function () {
  var body = document.querySelector('body');
  var bgColor = body.classList.contains('dark') ? 0x333333 : 0xffffff;
  var wireColor = body.classList.contains('dark') ? 0x444444 : 0xdddddd;
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  var header = document.querySelector('header');
  var width = 80;
  var height = 80;
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.domElement.id = 'logo';
  header.prepend(renderer.domElement);
  var camera = new THREE.PerspectiveCamera(60, width / height, .01, 1000);
  camera.position.set(0, 0, 2);
  var aLight = new THREE.AmbientLight(0x080808);
  scene.add(aLight);
  var dLight = new THREE.DirectionalLight(0xffffff, 1);
  dLight.position.set(1, 1, 1);
  scene.add(dLight);
  var dLight = new THREE.DirectionalLight(0xffffff, 0.4);
  dLight.position.set(-1, -.25, .25);
  scene.add(dLight);
  var pLight = new THREE.PointLight(0x1ac6ff, 0.8, 10);
  pLight.position.set(1, .5, .5);
  scene.add(pLight); // -----------------------------------------------------------------

  var cube = new THREE.Group();
  var cubeGeo = new THREE.IcosahedronBufferGeometry(0.8, 1);
  var wire = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({
    color: wireColor,
    wireframe: true
  }));
  var solid = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({
    color: bgColor
  }));
  cube.add(wire);
  cube.add(solid);
  scene.add(cube); // -----------------------------------------------------------------

  var mouse = new THREE.Vector2();
  var cubeTarget = new THREE.Euler();
  var xRange = THREE.Math.degToRad(90);
  var yRange = THREE.Math.degToRad(180);
  header.addEventListener('mousemove', mousemove, false);

  function mousemove(e) {
    // NDC -1 to 1
    var rect = header.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    mouse.y = (e.clientY - rect.top) / rect.height * -2 + 1;
    cubeTarget.y = mouse.x * yRange;
    cubeTarget.x = -mouse.y * xRange;
  } // window.addEventListener( 'resize', resize, false );
  // function resize() {
  // 	camera.aspect = width / height;
  // 	camera.updateProjectionMatrix();
  // 	renderer.setSize( width, height );
  // }


  renderer.setAnimationLoop(loop);

  function loop() {
    if (getComputedStyle(renderer.domElement).display == 'none') return;
    lerp(cube.rotation, 'x', cubeTarget.x);
    lerp(cube.rotation, 'y', cubeTarget.y);
    renderer.render(scene, camera);
  }

  function lerp(object, prop, destination) {
    if (object && object[prop] !== destination) {
      object[prop] += (destination - object[prop]) * 0.1;

      if (Math.abs(destination - object[prop]) < 0.001) {
        object[prop] = destination;
      }
    }
  }
})();
//# sourceMappingURL=app.js.map
