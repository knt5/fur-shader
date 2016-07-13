let textureLoader;

export default function loadTexture(path) {
	if (!textureLoader) {
		textureLoader = new THREE.TextureLoader();
	}
	
	return textureLoader.load(path);
}
