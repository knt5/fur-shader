import { $datGui } from './dom';

const datGui = new dat.GUI({
	autoPlace: false
});

const config = {
	wind: 1,
	gravity: 0.9,
	texture: 'giraffe',
	geometry: 'Sphere'
};

const textures = [
	'giraffe',
	'dot',
	'white',
	'cow',
	'fuji',
	'wave'
];

const geometries = [
	'Sphere',
	//'Text',
	'Torus',
	'TorusKnot',
	'Tetrahedron',
	'Octahedron',
	'Icosahedron',
	'Dodecahedron',
	//'Cylinder',
	'Box',
	'Cone',
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
	datGui.add(config, 'texture', textures);
	datGui.add(config, 'geometry', geometries);
	
	$datGui.append(datGui.domElement);
}
