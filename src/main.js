import './style.css';
import { scene, camera, renderer, controls, handleResize } from './scene.js';
import { sun, sunLight } from './sun.js';
import { createStars } from './stars.js';
import { planets } from './planets.js';

// Add objects to scene
scene.add(sun, sunLight);
planets.forEach(p => scene.add(p.group, p.orbit));
scene.add(createStars());

// Handle window resize
window.addEventListener('resize', () => handleResize(camera, renderer));

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    sun.rotation.y += 0.001;

    planets.forEach(p => {
        p.group.rotation.y += p.speed; // orbit rotation
        p.mesh.rotation.y += 0.005;    // self rotation
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();
