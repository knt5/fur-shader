import { $window, $datGui } from './dom';

const mobileWidthBorder = 480;

const datGui = new dat.GUI({
	autoPlace: false
});

let initFurLength = 12;
if ($window.width() <= mobileWidthBorder) {
	initFurLength = 20;
}

const config = {
	texture: 'pokemon',
	geometry: 'Sphere',
	textureDivde: 0.05,
	furStrength: 3,
	furLength: initFurLength,
	gravity: 0.9,
	wind: 1,
};

const textures = [
	'giraffe',
	'pokemon',
	'earth',
	'tiger',
	'zebra',
	'black-panther',
	'cow',
	'bear',
	'white',
	'blue-tile',
	'green-tile',
	'knit',
	'fuji',
	'wave',
];

const geometries = [
	'Sphere',
	'Torus',
	'TorusKnot',
	'Teapot',
	'Tetrahedron',
	'Octahedron',
	'Icosahedron',
	'Dodecahedron',
	'Cone',
	'Box',
	'Cylinder',
	'Text',
	//'Lathe',
	'Ring',
	'Circle',
	'Plane',
];

init();

//=========================================================
export default {
	config,
	textures
};

//=========================================================
function init() {
	datGui.add(config, 'texture', textures);
	datGui.add(config, 'geometry', geometries);
	if ($window.width() > mobileWidthBorder) {
		datGui.add(config, 'textureDivde', 0.05, 0.5);
		datGui.add(config, 'furStrength', 0, 20);
		datGui.add(config, 'furLength', 4, 32);
		datGui.add(config, 'gravity', 0, 3);
		datGui.add(config, 'wind', 0, 5);
	}
	
	$datGui.append(datGui.domElement);
}
