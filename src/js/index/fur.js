import { $stage, $vertexShader, $fragmentShader } from './dom';
import loadTexture from './loadTexture';
import datGui from './datGui';

export default {
	init,
	registerEvents,
	calc,
	updateTexture,
	updateGeometry,
	changeFurTexture,
	changeFurTextureFromImage,
};

//=========================================================
let prevTextureName = datGui.config.texture;
let prevGeometryName = datGui.config.geometry;
const textureWidth = 256;
const textureHeight = 128;
const numberOfShells = 60;
const geometrySize = 40;

// furTextureCanvas
const furTextureCanvas = document.createElement('canvas');
furTextureCanvas.width = textureWidth;
furTextureCanvas.height = textureHeight;

// 3D
let camera, scene, renderer;
let geometry;

// Font data
let font;

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
		furMaskTexture.anisotropy = renderer.getMaxAnisotropy();
		
		// Set positon of DOM
		//$geometry.css('bottom', ($datGui.height() + 46) + 'px');
		
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
	generateModel();
}

//=========================================================
function generateModel() {
	let shellsWillBeGeneratedByHandler = false;
	
	switch (datGui.config.geometry) {
		case 'Sphere':
			geometry = new THREE.SphereBufferGeometry(geometrySize / 2, 24, 24);
			break;
		case 'Torus':
			geometry = new THREE.TorusBufferGeometry(geometrySize / 2, 3, 16, 36);
			break;
		case 'TorusKnot':
			geometry = new THREE.TorusKnotBufferGeometry(geometrySize / 3, 1);
			break;
		case 'Teapot':
			geometry = new THREE.TeapotBufferGeometry(geometrySize / 2);
			break;
		case 'Tetrahedron':
			geometry = new THREE.TetrahedronGeometry(geometrySize / 2);
			break;
		case 'Octahedron':
			geometry = new THREE.OctahedronGeometry(geometrySize / 2);
			break;
		case 'Icosahedron':
			geometry = new THREE.IcosahedronGeometry(geometrySize / 2);
			break;
		case 'Dodecahedron':
			geometry = new THREE.DodecahedronGeometry(geometrySize / 2);
			break;
		case 'Cone':
			geometry = new THREE.ConeBufferGeometry(geometrySize / 2, geometrySize, 16);
			break;
		case 'Box':
			geometry = new THREE.BoxBufferGeometry(geometrySize, geometrySize, geometrySize);
			break;
		case 'Cylinder':
			geometry = new THREE.CylinderBufferGeometry(geometrySize / 4, geometrySize / 4, geometrySize / 2, 16);
			break;
		case 'Text':
			loadFont('optimer_bold', () => {
				geometry = new THREE.TextGeometry(datGui.config.texture.toUpperCase(), {
					font: font,
					size: geometrySize / 8,
					height: geometrySize / 12
				});
				geometry.center();
				generateShells(geometry, furTexture, furMaskTexture);
			});
			shellsWillBeGeneratedByHandler = true;
			break;
		/*
		case 'Lathe':
			geometry = new THREE.LatheBufferGeometry(geometrySize / 2, geometrySize, 16);
			break;
		*/
		case 'Ring':
			geometry = new THREE.RingBufferGeometry(geometrySize / 4, geometrySize / 2);
			break;
		case 'Circle':
			geometry = new THREE.CircleBufferGeometry(geometrySize / 2, 32);
			break;
		case 'Plane':
			geometry = new THREE.PlaneBufferGeometry(geometrySize, geometrySize);
			break;
	}
	
	if (! shellsWillBeGeneratedByHandler) {
		generateShells(geometry, furTexture, furMaskTexture);
	}
}

//=========================================================
function changeFurTexture(path) {
	// Load fur texture
	furTexture = loadTexture(path);
	furTexture.wrapS = furTexture.wrapT = THREE.RepeatWrapping;
}

//=========================================================
function changeFurTextureFromImage(image) {
	// Draw image to canvas
	// * MegaPixImage is required to draw large image to iOS canvas.
	const megaPixImage = new MegaPixImage(image);
	megaPixImage.render(furTextureCanvas, {
		width: textureWidth,
		height: textureHeight
	}, () => {
		// Generate texture
		furTexture = new THREE.Texture(furTextureCanvas);
		furTexture.wrapS = furTexture.wrapT = THREE.RepeatWrapping;
		furTexture.needsUpdate = true;
		
		init();
	});
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
function updateGeometry() {
	if (prevGeometryName !== datGui.config.geometry) {
		prevGeometryName = datGui.config.geometry;
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
		// Time
		meshes[i].material.uniforms.time.value = shaderTime;
		
		// Fur strength
		if (meshes[i].material.uniforms.furStrength.value !== datGui.config.furStrength) {
			meshes[i].material.uniforms.furStrength.value = datGui.config.furStrength;
		}
		
		// Fur length (shell spacing)
		if (meshes[i].material.uniforms.spacing.value !== datGui.config.furLength) {
			meshes[i].material.uniforms.spacing.value = datGui.config.furLength;
		}
		
		// Texture divide parameter
		if (meshes[i].material.uniforms.textureDivde.value !== datGui.config.textureDivde) {
			meshes[i].material.uniforms.textureDivde.value = datGui.config.textureDivde;
		}
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
		mouse.x = (event.originalEvent.targetTouches[0].clientX / $stage.width()) * 10 - 1;
		mouse.y = - (event.originalEvent.targetTouches[0].clientY / $stage.height()) * 10 + 1;
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
			color:        { type: 'c',  value: new THREE.Color( 0xffffff ) },
			furMaskMap:   { type: 't',  value: furMaskTexture },
			textureMap:   { type: 't',  value: furTexture },
			offset:	      { type: 'f',  value: i / numberOfShells },
			furStrength:  { type: 'f',  value: datGui.config.furStrength },
			spacing:      { type: 'f',  value: datGui.config.furLength },
			time:         { type: 'f',  value: shaderTime },
			gravity:      { type: 'v3', value: gravity },
			textureDivde: { type: 'f',  value: datGui.config.textureDivde },
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
	canvas.width = textureWidth;
	canvas.height = textureHeight;
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
	return `assets/img/fur/${datGui.config.texture}.png`;
}

//=========================================================
function loadFont(fontName, callback) {
	if (font) {
		callback();
	} else {
		$.getJSON(`assets/font/${fontName}.typeface.json`, (data) => {
			font = new THREE.Font(data);
			callback();
		});
	}
}
