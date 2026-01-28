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

// Create Planet 1
const planetGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x8888ff });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);

// Create a group to orbit around the sun
const planetGroup = new THREE.Group();
planet.position.x = 5; // distance from the sun
planetGroup.add(planet);
scene.add(planetGroup);

// Orbit speed
const planetSpeed = 0.02;


// Orbit the planet around the sun
planetGroup.rotation.y += planetSpeed;

// Rotate the planet around its own axis
planet.rotation.y += 0.01;

// Data for multiple planets
const planetsData = [
    { color: 0x8888ff, size: 0.5, distance: 5, speed: 0.02 },
    { color: 0x88ff88, size: 0.7, distance: 8, speed: 0.015 },
    { color: 0xff8888, size: 0.9, distance: 12, speed: 0.01 },
];

const planets = [];

planetsData.forEach(data => {
    const geo = new THREE.SphereGeometry(data.size, 16, 16);
    const mat = new THREE.MeshStandardMaterial({ color: data.color });
    const mesh = new THREE.Mesh(geo, mat);

    // Group for orbit
    const group = new THREE.Group();
    mesh.position.x = data.distance;
    group.add(mesh);
    scene.add(group);

    planets.push({ group, mesh, speed: data.speed });
});

planets.forEach(p => {
    // Orbit the planet around the sun
    p.group.rotation.y += p.speed;

    // Rotate the planet around its own axis
    p.mesh.rotation.y += 0.01;
});

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth motion
controls.dampingFactor = 0.05;
controls.enableZoom = true;    // allow zoom

controls.update();



planets.forEach(p => {
    const orbitGeometry = new THREE.RingGeometry(
        p.mesh.position.x - 0.01, // inner radius
        p.mesh.position.x + 0.01, // outer radius
        64
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2; // rotate to lie flat
    scene.add(orbit);
});

// Stars
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 1000;

const positions = new Float32Array(starsCount * 3); // x, y, z for each star

for (let i = 0; i < starsCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 200; // spread stars in space
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

controls.update();
renderer.render(scene, camera);
