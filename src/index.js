import * as THREE from './build/three.module.js';
import {OrbitControls} from './jsm/controls/OrbitControls';
// import {WEBGL} from 'webgl.js';


const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

// cnvs.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1.0, 10000 );
// camera.position = {x:0,y:0,z:5};
// camera.position.x = 50;
// camera.position.y = 50;
camera.position.z = 5;



const light = new THREE.AmbientLight(0xffffff);
scene.add( light );

const cnvs = document.getElementById('f380-sgji-38fx');
const renderer = new THREE.WebGLRenderer({canvas: cnvs});
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
controls.update();


function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
    cube.rotation.z += 0.02;

    controls.update();
    
    renderer.render( scene, camera );
}
animate();