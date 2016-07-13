const datGui = new dat.GUI();

const config = {
	wind: 1,
};

init();

//=========================================================
export default {
	config
};

//=========================================================
function init() {
	datGui.add(config, 'wind', 0, 5);
}
