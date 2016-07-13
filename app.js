// node
const fs = require('fs');
const path = require('path');

// libs
const mustache = require('mustache');
const express = require('express');

// Load templates
const templates = {
	index: '' + fs.readFileSync('templates/index.mustache'),
	vertexShader: '' + fs.readFileSync('templates/vertex.shader'),
	fragmentShader: '' + fs.readFileSync('templates/fragment.shader'),
};

// Create instance
const app = express();
app.use(express.static('public'));

// Router
app.get('/', (request, response) => {
	response.send(mustache.render(templates.index, {}, {
		vertexShader: templates.vertexShader,
		fragmentShader: templates.fragmentShader,
	}));
});

// Start server
app.listen(8000);
console.log('started');
