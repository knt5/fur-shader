import { $stage, $vertexShader, $fragmentShader } from './dom';
import loadTexture from './loadTexture';
import datGui from './datGui';

export default {
	init,
	registerEvents,
	calc,
	updateTexture,
	changeFurTexture,
	changeFurTextureFromImage,
};

//=========================================================
let prevTextureName = datGui.config.texture;
//const textureRepeat = 5;
const textureSize = 256;
const numberOfShells = 60;
//const geometrySize = 60;

// furTextureCanvas
const furTextureCanvas = document.createElement('canvas');
furTextureCanvas.width = textureSize;
furTextureCanvas.height = textureSize;
const furTextureContext = furTextureCanvas.getContext( '2d' );

// 3D
let camera, scene, renderer;
let geometry;

//=========================================================
let delta;
let time;
let oldTime;
let shaderTime = 0;
let meshes = [];
let furTexture;
let furMaskTexture;
let gravity = new THREE.Vector3(0, - datGui.config.gravity, 0);
var mouse = new THREE.Vector2(-0.5, 0.5);
let mouseModel = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
};

//=========================================================
function init(three) {
	if (three) {
		// Save parameters
		scene = three.scene;
		renderer = three.renderer;
		camera = three.camera;
		
		// Load fur texture
		changeFurTexture(getTexturePath());
		
		// Generate fur mask texture
		furMaskTexture = new THREE.Texture(generateFurMaskTextureCanvas());
		furMaskTexture.needsUpdate = true;
		furMaskTexture.wrapS = furMaskTexture.wrapT = THREE.RepeatWrapping;
		//furMaskTexture.repeat.set(textureRepeat, textureRepeat);
		furMaskTexture.anisotropy = renderer.getMaxAnisotropy();
		
	} else {
		if (meshes.length > 0) {
			let i;
			
			for (i=0; i<meshes.length; i++) {
				scene.remove(meshes[i]);
			}
			
			for (i=0; i<meshes.length; i++) {
				if (meshes[i].geometry) {
					meshes[i].geometry.dispose();
				}
				if (meshes[i].material) {
					meshes[i].material.dispose();
				}
			}
			
			meshes = [];
		}
	}
	
	// Generate model
	geometry = new THREE.SphereBufferGeometry(
		20,  // radius
		24,   // widthSegments
		24    // heightSegments
	);
	generateShells(geometry, furTexture, furMaskTexture);
}

//=========================================================
function changeFurTexture(path) {
	// Load fur texture
	furTexture = loadTexture(path);
	furTexture.wrapS = furTexture.wrapT = THREE.RepeatWrapping;
	//furTexture.repeat.set(textureRepeat, textureRepeat);
}

//=========================================================
function changeFurTextureFromImage(image) {
	if (image.width === textureSize && image.height === textureSize) {
		// Resize image
		furTextureContext.drawImage(image,
			0, 0, image.width, image.height,
			0, 0, textureSize, textureSize
		);
		
		const resizedImage = new Image();
		resizedImage.src = furTextureCanvas.toDataURL();
		
		furTexture = new THREE.Texture(resizedImage);
	} else {
		furTexture = new THREE.Texture(image);
	}
	
	furTexture.wrapS = furTexture.wrapT = THREE.RepeatWrapping;
}

//=========================================================
function updateTexture() {
	if (prevTextureName !== datGui.config.texture) {
		prevTextureName = datGui.config.texture;
		changeFurTexture(getTexturePath());
		init();
	}
}

//=========================================================
function calc() {
	if (oldTime === undefined) {
		delta = 1000 / 60;
	} else {
		time = Date.now();
		delta = time - oldTime;
		oldTime = time;
	}
	
	let optimalDivider = delta / 16;
	let smoothing = Math.max(4, (20 / optimalDivider));
	
	// Gravity
	let xf = (mouse.x - mouseModel.x) / (smoothing * 5);
	let yf = (mouse.y - mouseModel.y) / (smoothing * 5);
	mouseModel.vx += xf;
	mouseModel.vy += yf;
	mouseModel.vx *= 0.96;
	mouseModel.vy *= 0.94;
	mouseModel.x += mouseModel.vx;
	mouseModel.y += mouseModel.vy;
	
	gravity.x = -(mouse.x - mouseModel.x) * datGui.config.wind;
	
	let diff = Math.sin(mouse.x) * 150 - camera.position.x;
	gravity.y = - datGui.config.gravity + (Math.abs(diff) / 150) - (mouse.y - mouseModel.y) * datGui.config.wind;
	
	shaderTime += delta * 0.005;
	
	let i;
	for (i=0; i<meshes.length; i++) {
		meshes[i].material.uniforms.globalTime.value = shaderTime;
	}
}

//=========================================================
function registerEvents() {
	$stage.on('mousemove', (event) => {
		event.originalEvent.preventDefault();
		mouse.x = (event.clientX / $stage.width()) * 2 - 1;
		mouse.y = - (event.clientY / $stage.height()) * 2 + 1;
	});
	
	$stage.on('touchmove', (event) => {
		event.originalEvent.preventDefault();
		mouse.x = (event.originalEvent.touches[0].clientX / $stage.width()) * 2 - 1;
		mouse.y = - (event.originalEvent.touches[0].clientY / $stage.height()) * 2 + 1;
	});
}

//=========================================================
function generateShells(geometry, furTexture, furMaskTexture) {
	// Generate and add shell meshs to scene
	let uniforms;
	let material;
	let mesh;
	let i;
	for (i=0; i<numberOfShells; i++) {
		// Create uniforms
		uniforms = {
			color:      { type: 'c',  value: new THREE.Color( 0xffffff ) },
			hairMap:    { type: 't',  value: furMaskTexture },
			colorMap:   { type: 't',  value: furTexture },
			offset:	    { type: 'f',  value: i / numberOfShells },
			globalTime: { type: 'f',  value: shaderTime },
			gravity:    { type: 'v3', value: gravity },
		};
		
		// Create material
		material = new THREE.ShaderMaterial( {
			uniforms:       uniforms,
			vertexShader:   $vertexShader.text(),
			fragmentShader: $fragmentShader.text(),
			transparent: true,
		});
		
		// Create mesh
		mesh =  new THREE.Mesh(geometry, material);
		mesh.matrixAutoUpdate = false;
		mesh.frustumCulled = false;
		
		// Add mesh
		scene.add(mesh);
		meshes.push(mesh);
	}
}

//=========================================================
function generateFurMaskTextureCanvas() {
	const canvas = document.createElement('canvas');
	canvas.width = textureSize;
	canvas.height = textureSize;
	const context = canvas.getContext( '2d' );
	
	let i;
	for (i=0; i<20000; i++) {
		context.fillStyle = 'rgba(' +
			'255,' +                                   // R : fur 1/0
			Math.floor( Math.random() * 255 ) + ',' +  // G : length
			Math.floor( Math.random() * 255 ) +',' +   // B : darkness
			'1)';                                      // A
		
		context.fillRect(
			(Math.random() * canvas.width),
			(Math.random() * canvas.height),
			2,
			2
		);
	}
	
	return canvas;
}

//=========================================================
function getTexturePath() {
	return `/img/fur/${datGui.config.texture}.png`;
}
