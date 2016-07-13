const datGui = new dat.GUI();

const config = {
	gravity: 1,
};

init();

//=========================================================
export default {
	config
};

//=========================================================
function init() {
	datGui.add(config, 'gravity', 0, 10);
}
