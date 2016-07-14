const datGui = new dat.GUI();

const config = {
	wind: 1,
	gravity: 0.9,
	texture: 'giraffe',
};

const textures = [
	'giraffe',
	'dot',
	'white',
	'cow',
	'fuji',
	'wave'
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
}
