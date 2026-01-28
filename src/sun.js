import * as THREE from 'three';

// Sun mesh
export const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
export const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
export const sun = new THREE.Mesh(sunGeometry, sunMaterial);

// Sun light
export const sunLight = new THREE.PointLight(0xffffff, 2, 100);
sunLight.position.set(0, 0, 0); // center of scene
