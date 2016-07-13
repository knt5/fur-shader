import { $window, $stage } from './dom';
import fur from './fur';

let camera, scene, renderer;
let light, ambientLight;
let trackball;

// Camera
let cameraRadius = 150;
let cameraHeight = 40;
let cameraDirection = Math.PI / 2;

init();
animate();

//=========================================================
function init() {
	createStage();  // Create renderer, scene, camera and controls
	addLights();
	
	//scene.add(new THREE.GridHelper(300, 10));
	
	fur.init({
		scene,
		renderer,
		camera
	});
	
	registerEvents();
	fur.registerEvents();
}

//=========================================================
function createStage() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(getWidth(), getHeight());
	renderer.setPixelRatio(renderer.getPixelRatio());
	renderer.setClearColor(0x333333);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	$stage.append(renderer.domElement);
	
	// scene
	scene = new THREE.Scene();
	scene.autoUpdate = false;
	// scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	
	// camera
	camera = new THREE.PerspectiveCamera(30, getAspect(), 1, 10000);
	camera.position.set(
		cameraRadius * Math.cos(cameraDirection),
		cameraHeight,
		cameraRadius * Math.sin(cameraDirection)
	);
	scene.add(camera);
	
	// controls
	trackball = new THREE.TrackballControls(camera, $stage.get(0));
	trackball.staticMoving = false;
	trackball.maxDistance = 1000;
	trackball.minDistance = 100;
}

//=========================================================
function addLights() {
	// directional
	light = new THREE.DirectionalLight(0xffffff, 0.5);
	light.position.set(0, 100, 300);
	scene.add(light);
	
	// helper
	//scene.add(new THREE.CameraHelper(light.shadow.camera));
	
	// ambient
	ambientLight = new THREE.AmbientLight(0xffffff);
	scene.add(ambientLight);
}

//=========================================================
function registerEvents() {
	$window.on('resize', () => {
		camera.aspect = getAspect();
		camera.updateProjectionMatrix();
		renderer.setSize(getWidth(), getHeight());
	});
}

//=========================================================
function render() {
	scene.updateMatrixWorld();
	renderer.render(scene, camera);
}

//=========================================================
function animate() {
	fur.calc();
	trackball.update();
	render();
	requestAnimationFrame(animate);
}

//=========================================================
function getWidth() {
	return window.innerWidth;
}

function getHeight() {
	return window.innerHeight;
}

function getAspect() {
	return getWidth() / getHeight();
}
