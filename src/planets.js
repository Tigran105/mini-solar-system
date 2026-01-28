import * as THREE from 'three';

export const planetsData = [
    { color: 0x8888ff, size: 0.5, distance: 5, speed: 0.01 },
    { color: 0x88ff88, size: 0.7, distance: 8, speed: 0.0075 },
    { color: 0xff8888, size: 0.9, distance: 12, speed: 0.005 },
];

export const planets = [];

function createPlanet(data) {
    // Planet mesh
    const geometry = new THREE.SphereGeometry(data.size, 16, 16);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const mesh = new THREE.Mesh(geometry, material);

    // Random initial position on orbit
    const angle = Math.random() * Math.PI * 2;
    mesh.position.x = Math.cos(angle) * data.distance;
    mesh.position.z = Math.sin(angle) * data.distance;
    mesh.position.y = 0;

    // Group for orbiting
    const group = new THREE.Group();
    group.add(mesh);

    // Orbit ring
    const orbitGeometry = new THREE.RingGeometry(data.distance - 0.01, data.distance + 0.01, 64);
    const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;

    return { group, mesh, speed: data.speed, orbit };
}

// Create all planets
planetsData.forEach(data => planets.push(createPlanet(data)));
