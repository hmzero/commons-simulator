import * as THREE from 'https://cdn.skypack.dev/three@0.135.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js';

let camera, controls, scene, renderer;

// objects
const geometry = new THREE.IcosahedronGeometry(10, 2);
const material = new THREE.MeshPhongMaterial( { color: 0xF04718, flatShading: true } );

var speed = 500; // units per second
var clock = new THREE.Clock();
var delta;

function Entity()
{
	this.direction = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();
	this.shift = new THREE.Vector3();
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.position.x = 0;
	this.mesh.position.y = 8;
	this.mesh.position.z = 0;
	this.mesh.updateMatrix();
	this.mesh.matrixAutoUpdate = true;

	scene.add( this.mesh );
}

init();

var entities = [];

function createEntity()
{
	entities.push(new Entity());
}

function removeEntity()
{
	scene.remove(entities[entities.length-1].mesh)
	entities.pop();
}

function tragedy()
{
	entities.forEach(function(item, index){
		scene.remove(item.mesh);
	})

	entities = [];
	resources = 1
	PARAMS.consumers = 0

	alert("Tragedy! The resources are depleted and everything has died.")
}

animate();

add.on('click', () => {
  	PARAMS.consumers++;
  	createEntity();
});

remove.on('click', () => {
	if(PARAMS.consumers > 0)
	{
	  	PARAMS.consumers--;
	  	removeEntity();
	}
});

function init() {

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x53BDED );
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 400, 200, 0 );

	// controls

	controls = new OrbitControls( camera, renderer.domElement );

	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;

	controls.screenSpacePanning = false;

	controls.minDistance = 100;
	controls.maxDistance = 500;

	controls.maxPolarAngle = Math.PI / 3;

	controls.autoRotate = true;
	controls.enablePan = false;

	// ground plane

	const plane = new THREE.PlaneGeometry(300, 300)
	const grass = new THREE.MeshBasicMaterial( { color: 0x99F051 });
	const ground = new THREE.Mesh(plane, grass);
	ground.rotation.x = -Math.PI / 2;
	ground.position.set(0, 0, 0);
	scene.add(ground);

	// lights

	const dirLight1 = new THREE.DirectionalLight( 0xffffff );
	dirLight1.position.set( 1, 1, 1 );
	scene.add( dirLight1 );

	const dirLight2 = new THREE.DirectionalLight( 0x002288 );
	dirLight2.position.set( - 1, - 1, - 1 );
	scene.add( dirLight2 );

	const ambientLight = new THREE.AmbientLight( 0x222222 );
	scene.add( ambientLight );

	//

	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

	// check if resources are depleated
	console.log(end);
	if(end)
	{
		end = false;
		tragedy();
	}

	delta = clock.getDelta();
	// move entities
	entities.forEach(function(item, index){
		item.mesh.rotation.x += 0.01;
		item.mesh.rotation.y += 0.01;

		item.shift.copy(item.direction).multiplyScalar(delta * (speed / (PARAMS.speed/500)));
		item.mesh.position.add(item.shift);

		if(item.mesh.position.x > 150 || item.mesh.position.x < -150)
		{
			item.direction = new THREE.Vector3(-item.direction.x, 0, item.direction.z);
		}

		if(item.mesh.position.z > 150 || item.mesh.position.z < -150)
		{
			item.direction = new THREE.Vector3(item.direction.x, 0, -item.direction.z);
		}
	});

	render();

}

function render() {

	renderer.render( scene, camera );

}
