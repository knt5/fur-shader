import { $datGui } from './dom';

const datGui = new dat.GUI({
	autoPlace: false
});

const config = {
	texture: 'pokemon',
	geometry: 'Sphere',
	textureDivde: 0.05,
	furStrength: 3,
	furLength: 12,
	gravity: 0.9,
	wind: 1,
};

const textures = [
	'giraffe',
	'pokemon',
	'earth',
	'blue-tile',
	'green-tile',
	'cow',
	'zebra',
	'black-panther',
	'bear',
	'tiger',
	'white',
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
	datGui.add(config, 'textureDivde', 0.05, 0.5);
	datGui.add(config, 'furStrength', 0, 20);
	datGui.add(config, 'furLength', 4, 32);
	datGui.add(config, 'gravity', 0, 3);
	datGui.add(config, 'wind', 0, 5);
	
	$datGui.append(datGui.domElement);
}
