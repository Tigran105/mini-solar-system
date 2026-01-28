import './style.css';
import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 10;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#scene'),
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Render once
renderer.render(scene, camera);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});


// Light
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 0, 0); // центр сцены
scene.add(light);


// Sun
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00 }); // светится сам
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);



function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.002;

    renderer.render(scene, camera);
}

animate();

