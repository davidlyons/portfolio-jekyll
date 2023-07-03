"use strict";

(function () {
  var bgColor = 0x333333;
  var wireColor = 0x555555;
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  var header = document.querySelector('header');
  var container = document.getElementById('logo');
  var width = 80;
  var height = 80;
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);
  var camera = new THREE.PerspectiveCamera(60, width / height, 0.01, 1000);
  camera.position.set(0, 0, 2.4);

  // var aLight = new THREE.AmbientLight(0x080808);
  // scene.add(aLight);

  // var dLight = new THREE.DirectionalLight(0xffffff, 1);
  // dLight.position.set(1, 1, 1);
  // scene.add(dLight);

  // var dLight = new THREE.DirectionalLight(0xffffff, 0.4);
  // dLight.position.set(-1, -0.25, 0.25);
  // scene.add(dLight);

  // var pLight = new THREE.PointLight(0x1ac6ff, 0.8, 10);
  // pLight.position.set(1, 0.5, 0.5);
  // scene.add(pLight);

  // -----------------------------------------------------------------

  var group = new THREE.Group();
  var geo = new THREE.IcosahedronGeometry(0.8, 0);
  var wireMat = new THREE.MeshBasicMaterial({
    color: wireColor,
    wireframe: true
  });
  var solidMat = new THREE.MeshBasicMaterial({
    color: bgColor
  });
  var wireMesh = new THREE.Mesh(geo, wireMat);
  var solidMesh = new THREE.Mesh(geo, solidMat);
  group.add(wireMesh);
  group.add(solidMesh);
  scene.add(group);

  // -----------------------------------------------------------------

  var mouse = new THREE.Vector2();
  var groupTarget = new THREE.Euler();
  var xRange = THREE.MathUtils.degToRad(90);
  var yRange = THREE.MathUtils.degToRad(180);
  header.addEventListener('mousemove', mousemove, false);
  function mousemove(e) {
    // NDC -1 to 1
    var rect = header.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    mouse.y = (e.clientY - rect.top) / rect.height * -2 + 1;
    groupTarget.y = mouse.x * yRange;
    groupTarget.x = -mouse.y * xRange;
  }

  // window.addEventListener( 'resize', resize, false );
  // function resize() {
  // 	camera.aspect = width / height;
  // 	camera.updateProjectionMatrix();
  // 	renderer.setSize( width, height );
  // }

  renderer.setAnimationLoop(loop);
  function loop() {
    if (getComputedStyle(renderer.domElement).display == 'none') return;
    lerp(group.rotation, 'x', groupTarget.x);
    lerp(group.rotation, 'y', groupTarget.y);
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
