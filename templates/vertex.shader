uniform float offset;
uniform float globalTime;
uniform vec3 gravity;

varying vec2 vUv;
varying vec3 vNormal;

const float spacing = 12.0;

void main() {
	vec3 displacement = vec3(0.0, 0.0, 0.0);
	vec3 forceDirection = vec3(0.0, 0.0, 0.0);

	// "wind"
	forceDirection.x = sin(globalTime + position.x * 0.05) * 0.2;
	forceDirection.y = cos(globalTime * 0.7 + position.y * 0.04) * 0.2;
	forceDirection.z = sin(globalTime * 0.7 + position.y * 0.04) * 0.2;

	// "gravity"
	displacement = gravity + forceDirection;

	float displacementFactor = pow(offset, 3.0);

	vec3 aNormal = normal;
	aNormal.xyz += displacement * displacementFactor;

	// move outwards depending on offset(layer) and normal+force+gravity
	vec3 animated = vec3(position.x, position.y, position.z) + (normalize(aNormal) * offset * spacing);

	vNormal = normalize(normal * aNormal);

	vUv = uv * 20.0;

	vec4 mvPosition = modelViewMatrix * vec4(animated, 1.0);

	gl_Position = projectionMatrix * mvPosition;
}
