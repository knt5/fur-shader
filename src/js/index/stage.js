import { $window, $stage, $textureInput, $datGui } from './dom';
import fur from './fur';
import sns from './sns';

let camera, scene, renderer;
let light, ambientLight;
let trackball;

// Camera
let cameraRadius = 192;
let cameraHeight = 40;
let cameraDirection = Math.PI / 2;

init();
animate();

//=========================================================
function init() {
	// Setup 3D stage
	createStage();  // Create renderer, scene, camera and controls
	addLights();
	//scene.add(new THREE.GridHelper(300, 10));
	
	// Initialize fur object
	fur.init({
		scene,
		renderer,
		camera
	});
	
	// Register event handlers
	registerEvents();
	fur.registerEvents();
	
	// Set dat.GUI panel position
	if (sns.isFacebookApp()) {
		$datGui.css('bottom', ($window.height() - sns.getFacebookAppHeight()) + 'px');
	}
}

//=========================================================
function createStage() {
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(getWidth(), getHeight());
	renderer.setPixelRatio(renderer.getPixelRatio());
	renderer.setClearColor(0x222222);
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
	
	$textureInput.on('change', () => {
		const files = event.target.files;
		if (files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = () => {
				const image = new Image();
				image.src = reader.result;
				fur.changeFurTextureFromImage(image);
			};
		}
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
	fur.updateTexture();
	fur.updateGeometry();
	
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
