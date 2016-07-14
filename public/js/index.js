!function e(t,r,n){function a(i,u){if(!r[i]){if(!t[i]){var d="function"==typeof require&&require;if(!u&&d)return d(i,!0);if(o)return o(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var c=r[i]={exports:{}};t[i][0].call(c.exports,function(e){var r=t[i][1][e];return a(r?r:e)},c,c.exports,e,t,r,n)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<n.length;i++)a(n[i]);return a}({1:[function(e,t,r){"use strict";e("./stage")},{"./stage":6}],2:[function(e,t,r){"use strict";function n(){o.add(i,"wind",0,5),o.add(i,"gravity",0,3),o.add(i,"texture",u),o.add(i,"geometry",d),a.$datGui.append(o.domElement)}Object.defineProperty(r,"__esModule",{value:!0});var a=e("./dom"),o=new dat.GUI({autoPlace:!1}),i={wind:1,gravity:.9,texture:"giraffe",geometry:"Sphere"},u=["giraffe","dot","white","cow","fuji","wave"],d=["Sphere","Torus","TorusKnot","Tetrahedron","Octahedron","Icosahedron","Dodecahedron","Box","Cone","Ring","Circle","Plane"];n(),r["default"]={config:i,textures:u}},{"./dom":3}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.$window=$(window),r.$stage=$("#stage"),r.$vertexShader=$("#vertexShader"),r.$fragmentShader=$("#fragmentShader"),r.$datGui=$("#datGui"),r.$textureInput=$("#textureInput")},{}],4:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(e){if(e)C=e.scene,_=e.renderer,G=e.camera,i(g()),j=new THREE.Texture(v()),j.needsUpdate=!0,j.wrapS=j.wrapT=THREE.RepeatWrapping,j.anisotropy=_.getMaxAnisotropy();else if(F.length>0){var t=void 0;for(t=0;t<F.length;t++)C.remove(F[t]);for(t=0;t<F.length;t++)F[t].geometry&&F[t].geometry.dispose(),F[t].material&&F[t].material.dispose();F=[]}o()}function o(){switch(x["default"].config.geometry){case"Sphere":P=new THREE.SphereBufferGeometry(M/2,24,24);break;case"Torus":P=new THREE.TorusBufferGeometry(M/2,3,16,36);break;case"TorusKnot":P=new THREE.TorusKnotBufferGeometry(M/2,3,100,12);break;case"Tetrahedron":P=new THREE.TetrahedronGeometry(M/2);break;case"Octahedron":P=new THREE.OctahedronGeometry(M/2);break;case"Icosahedron":P=new THREE.IcosahedronGeometry(M/2);break;case"Dodecahedron":P=new THREE.DodecahedronGeometry(M/2);break;case"Box":P=new THREE.BoxBufferGeometry(M,M,M);break;case"Cone":P=new THREE.ConeBufferGeometry(M/2,M,16);break;case"Ring":P=new THREE.RingBufferGeometry(M/4,M/2);break;case"Circle":P=new THREE.CircleBufferGeometry(M/2,32);break;case"Plane":P=new THREE.PlaneBufferGeometry(M,M)}s(P,U,j)}function i(e){U=(0,E["default"])(e),U.wrapS=U.wrapT=THREE.RepeatWrapping}function u(e){S.drawImage(e,0,0,e.width,e.height,0,0,R,R),U=new THREE.Texture(b),U.needsUpdate=!0,U.wrapS=U.wrapT=THREE.RepeatWrapping,a()}function d(){y!==x["default"].config.texture&&(y=x["default"].config.texture,i(g()),a())}function f(){T!==x["default"].config.geometry&&(T=x["default"].config.geometry,a())}function c(){void 0===B?D=1e3/60:(I=Date.now(),D=I-B,B=I);var e=D/16,t=Math.max(4,20/e),r=(W.x-q.x)/(5*t),n=(W.y-q.y)/(5*t);q.vx+=r,q.vy+=n,q.vx*=.96,q.vy*=.94,q.x+=q.vx,q.y+=q.vy,L.x=-(W.x-q.x)*x["default"].config.wind;var a=150*Math.sin(W.x)-G.position.x;L.y=-x["default"].config.gravity+Math.abs(a)/150-(W.y-q.y)*x["default"].config.wind,O+=.005*D;var o=void 0;for(o=0;o<F.length;o++)F[o].material.uniforms.globalTime.value=O}function l(){m.$stage.on("mousemove",function(e){e.originalEvent.preventDefault(),W.x=e.clientX/m.$stage.width()*2-1,W.y=2*-(e.clientY/m.$stage.height())+1}),m.$stage.on("touchmove",function(e){e.originalEvent.preventDefault(),W.x=e.originalEvent.touches[0].clientX/m.$stage.width()*2-1,W.y=2*-(e.originalEvent.touches[0].clientY/m.$stage.height())+1})}function s(e,t,r){var n=void 0,a=void 0,o=void 0,i=void 0;for(i=0;i<H;i++)n={color:{type:"c",value:new THREE.Color(16777215)},hairMap:{type:"t",value:r},colorMap:{type:"t",value:t},offset:{type:"f",value:i/H},globalTime:{type:"f",value:O},gravity:{type:"v3",value:L}},a=new THREE.ShaderMaterial({uniforms:n,vertexShader:m.$vertexShader.text(),fragmentShader:m.$fragmentShader.text(),transparent:!0}),o=new THREE.Mesh(e,a),o.matrixAutoUpdate=!1,o.frustumCulled=!1,C.add(o),F.push(o)}function v(){var e=document.createElement("canvas");e.width=R,e.height=R;var t=e.getContext("2d"),r=void 0;for(r=0;r<2e4;r++)t.fillStyle="rgba(255,"+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+",1)",t.fillRect(Math.random()*e.width,Math.random()*e.height,2,2);return e}function g(){return"/img/fur/"+x["default"].config.texture+".png"}function h(e){$.getJSON("/font/"+e+".typeface.json",function(e){k=new THREE.Font(e)})}Object.defineProperty(r,"__esModule",{value:!0});var m=e("./dom"),p=e("./loadTexture"),E=n(p),w=e("./datGui"),x=n(w);r["default"]={init:a,registerEvents:l,calc:c,updateTexture:d,updateGeometry:f,changeFurTexture:i,changeFurTextureFromImage:u};var y=x["default"].config.texture,T=x["default"].config.geometry,R=256,H=60,M=40,b=document.createElement("canvas");b.width=R,b.height=R;var S=b.getContext("2d"),G=void 0,C=void 0,_=void 0,P=void 0,k=void 0;h("optimer_bold");var D=void 0,I=void 0,B=void 0,O=0,F=[],U=void 0,j=void 0,L=new THREE.Vector3(0,(-x["default"].config.gravity),0),W=new THREE.Vector2((-.5),.5),q={x:0,y:0,vx:0,vy:0}},{"./datGui":2,"./dom":3,"./loadTexture":5}],5:[function(e,t,r){"use strict";function n(e){return a||(a=new THREE.TextureLoader),a.load(e)}Object.defineProperty(r,"__esModule",{value:!0}),r["default"]=n;var a=void 0},{}],6:[function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function a(){o(),i(),h["default"].init({scene:p,renderer:E,camera:m}),u(),h["default"].registerEvents()}function o(){E=new THREE.WebGLRenderer,E.setSize(c(),l()),E.setPixelRatio(E.getPixelRatio()),E.setClearColor(3355443),E.shadowMap.enabled=!0,E.shadowMap.type=THREE.PCFSoftShadowMap,v.$stage.append(E.domElement),p=new THREE.Scene,p.autoUpdate=!1,m=new THREE.PerspectiveCamera(30,s(),1,1e4),m.position.set(T*Math.cos(H),R,T*Math.sin(H)),p.add(m),y=new THREE.TrackballControls(m,v.$stage.get(0)),y.staticMoving=!1,y.maxDistance=1e3,y.minDistance=100}function i(){w=new THREE.DirectionalLight(16777215,.5),w.position.set(0,100,300),p.add(w),x=new THREE.AmbientLight(16777215),p.add(x)}function u(){v.$window.on("resize",function(){m.aspect=s(),m.updateProjectionMatrix(),E.setSize(c(),l())}),v.$textureInput.on("change",function(){var e=event.target.files;e.length>0&&!function(){var t=new FileReader;t.readAsDataURL(e[0]),t.onload=function(){var e=new Image;e.src=t.result,h["default"].changeFurTextureFromImage(e)}}()})}function d(){p.updateMatrixWorld(),E.render(p,m)}function f(){h["default"].calc(),h["default"].updateTexture(),h["default"].updateGeometry(),y.update(),d(),requestAnimationFrame(f)}function c(){return window.innerWidth}function l(){return window.innerHeight}function s(){return c()/l()}var v=e("./dom"),g=e("./fur"),h=n(g),m=void 0,p=void 0,E=void 0,w=void 0,x=void 0,y=void 0,T=150,R=40,H=Math.PI/2;a(),f()},{"./dom":3,"./fur":4}]},{},[1]);