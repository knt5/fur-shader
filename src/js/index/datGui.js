import { $datGui } from './dom';

const datGui = new dat.GUI({
	autoPlace: false
});

const config = {
	wind: 1,
	gravity: 0.9,
	furStrength: 3,
	furLength: 12,
	texture: 'giraffe',
	geometry: 'Sphere',
};

const textures = [
	'giraffe',
	'tiger',
	'cow',
	'zebra',
	'black-panther',
	'bear',
	'dot',
	'white',
	'knit',
	'blue-tile',
	'green-tile',
	'fuji',
	'wave',
];

const geometries = [
	'Sphere',
	'Torus',
	'TorusKnot',
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
	datGui.add(config, 'wind', 0, 5);
	datGui.add(config, 'gravity', 0, 3);
	datGui.add(config, 'furStrength', 0, 20);
	datGui.add(config, 'furLength', 4, 32);
	datGui.add(config, 'texture', textures);
	datGui.add(config, 'geometry', geometries);
	
	$datGui.append(datGui.domElement);
}
