"use strict";

(function () {
  var container = document.getElementById('header-bg');
  var body = document.querySelector('body');
  var bgColor = body.classList.contains('dark') ? 0x333333 : 0xffffff;
  var wireColor = body.classList.contains('dark') ? 0x444444 : 0xdddddd;
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(bgColor);
  var header = document.querySelector('header');
  var height = header.offsetHeight - 1;
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, height);
  container.appendChild(renderer.domElement);
  var camera = new THREE.PerspectiveCamera(30, window.innerWidth / height, 1, 10000);
  camera.position.set(0, 0, 1500); // -----------------------------------------------------------------

  var OutlineShader = {
    uniforms: {
      offset: {
        type: 'f',
        value: 3.0
      },
      color: {
        type: 'v3',
        value: new THREE.Color(wireColor)
      },
      alpha: {
        type: 'f',
        value: 0.8
      }
    },
    vertexShader:
    /* glsl */
    "\n\n\t\t\tuniform float offset;\n\n\t\t\tvoid main() {\n\t\t\t\tvec4 pos = modelViewMatrix * vec4( position + normal * offset, 1.0 );\n\t\t\t\tgl_Position = projectionMatrix * pos;\n\t\t\t}\n\t\t",
    fragmentShader:
    /* glsl */
    "\n\n\t\t\tuniform vec3 color;\n\t\t\tuniform float alpha;\n\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = vec4( color, alpha );\n\t\t\t}\n\t\t"
  }; // ----------------------------------------------------------

  var outlineMat = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(OutlineShader.uniforms),
    vertexShader: OutlineShader.vertexShader,
    fragmentShader: OutlineShader.fragmentShader,
    side: THREE.BackSide,
    transparent: true
  }); // ------------------------------------------------------------

  var sphereGeo = new THREE.SphereBufferGeometry(20, 20, 10);
  var sphereMat = window.sphereMat = new THREE.MeshBasicMaterial({
    color: bgColor
  });
  var xgrid = 30,
      ygrid = 9,
      zgrid = 10;

  for (var i = 0; i < xgrid; i++) {
    for (var j = 0; j < ygrid; j++) {
      for (var k = 0; k < zgrid; k++) {
        var mesh = new THREE.Mesh(sphereGeo, sphereMat);
        var x = 200 * (i - xgrid / 2);
        var y = 200 * (j - ygrid / 2);
        var z = 200 * (k - zgrid / 2);
        mesh.position.set(x, y, z);
        scene.add(mesh);
        var outline = new THREE.Mesh(sphereGeo, outlineMat);
        mesh.add(outline);
      }
    }
  } // -----------------------------------------------------------------


  var mouse = new THREE.Vector2();
  var cameraTarget = new THREE.Vector3();
  header.addEventListener('mousemove', mousemove, false);

  function mousemove(e) {
    // NDC -1 to 1
    var rect = renderer.domElement.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
    mouse.y = (e.clientY - rect.top) / rect.height * -2 + 1;
    cameraTarget.x = mouse.x * 500;
    cameraTarget.y = mouse.y * 200;
  }

  window.addEventListener('resize', resize, false);

  function resize() {
    height = header.offsetHeight - 1;
    camera.aspect = window.innerWidth / height;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, height);
  }

  renderer.setAnimationLoop(loop);

  function loop() {
    lerp(camera.position, 'x', cameraTarget.x);
    lerp(camera.position, 'y', cameraTarget.y);
    renderer.render(scene, camera);
  }

  function lerp(object, prop, destination) {
    if (object && object[prop] !== destination) {
      object[prop] += (destination - object[prop]) * 0.05;

      if (Math.abs(destination - object[prop]) < 0.001) {
        object[prop] = destination;
      }
    }
  }
})();
//# sourceMappingURL=app.js.map
