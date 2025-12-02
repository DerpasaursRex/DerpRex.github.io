// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000 // Extended far plane for massive galaxy
);

const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

// Create starfield
function createStarfield() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
    });

    const starsCount = 3000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
        starsPositions[i] = (Math.random() - 0.5) * 1000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// Create massive galaxy with rotating black hole center
function createBlackHole() {
    const galaxyGroup = new THREE.Group();
    
    // Create pulsing black hole center sphere - make it visible through the glow
    const centerGeometry = new THREE.SphereGeometry(50, 32, 32); // Make it bigger
    const centerMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000, // Start black
        transparent: true,
        opacity: 0.9
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    centerSphere.position.set(0, 0, 0);
    // Ensure it renders on top
    centerSphere.renderOrder = 999;
    const blackHole = new THREE.Object3D();
    blackHole.position.set(0, 0, 0);
    
    // Glowing event horizon with orange gradient - multiple layers to create doughnut effect
    // Inner bright orange glow (hottest part near event horizon) - starts outside center sphere
    const glowGeometry0 = new THREE.SphereGeometry(52, 32, 32);
    const glowMaterial0 = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glowSphere0 = new THREE.Mesh(glowGeometry0, glowMaterial0);
    glowSphere0.position.set(0, 0, 0);
    
    const glowGeometry1 = new THREE.SphereGeometry(52, 32, 32);
    const glowMaterial1 = new THREE.MeshBasicMaterial({
        color: 0xff8844,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glowSphere1 = new THREE.Mesh(glowGeometry1, glowMaterial1);
    glowSphere1.position.set(0, 0, 0);
    
    const glowGeometry2 = new THREE.SphereGeometry(54, 32, 32);
    const glowMaterial2 = new THREE.MeshBasicMaterial({
        color: 0xffcc88,
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glowSphere2 = new THREE.Mesh(glowGeometry2, glowMaterial2);
    glowSphere2.position.set(0, 0, 0);
    
    // Outer fade layer
    const glowGeometry3 = new THREE.SphereGeometry(56, 32, 32);
    const glowMaterial3 = new THREE.MeshBasicMaterial({
        color: 0xffdd99,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const glowSphere3 = new THREE.Mesh(glowGeometry3, glowMaterial3);
    glowSphere3.position.set(0, 0, 0);
    
    // Inner bright orange ring (brightest part of accretion disk) - much larger
    const innerRingGeometry = new THREE.RingGeometry(45, 55, 64);
    const innerRingMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6600,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    innerRing.rotation.x = Math.PI / 2; // Rotate to be horizontal
    innerRing.position.set(0, 0, 0);
    
    galaxyGroup.add(blackHole);
    galaxyGroup.add(glowSphere0);
    galaxyGroup.add(glowSphere1);
    galaxyGroup.add(glowSphere2);
    galaxyGroup.add(glowSphere3);
    galaxyGroup.add(innerRing);
    // Add center sphere last so it renders on top
    galaxyGroup.add(centerSphere);
    
    // Create massive galaxy spiral disk extending 400 units
    const galaxyDisk = new THREE.Group();
    const particleCount = 3000; // Reduced density for subtlety
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Create spiral distribution extending 400 units (starting outside black hole)
        const angle = Math.random() * Math.PI * 2;
        const radius = 60 + Math.random() * 340; // From 60 to 400 units (outside 50 unit black hole)
        const height = (Math.random() - 0.5) * 30; // Slight 3D curve
        
        // Create spiral arms - more tightly wound near center
        const spiralTightness = Math.pow(radius / 400, 1.5);
        const spiralAngle = angle + radius * 0.5 * spiralTightness;
        
        positions[i3] = Math.cos(spiralAngle) * radius;
        positions[i3 + 1] = height + Math.sin(spiralAngle * 2) * 15; // Wave effect
        positions[i3 + 2] = Math.sin(spiralAngle) * radius;
        
        // Color gradient: orange at center -> white in middle -> black at edges
        const centerRadius = 120; // Orange fades out here
        const whiteRadius = 250; // White fades to black here
        
        let r, g, b;
        
        if (radius < centerRadius) {
            // Orange to white gradient (inner to middle)
            const t = radius / centerRadius;
            const orangeIntensity = 1 - t;
            r = 1.0;
            g = 1.0 - orangeIntensity * 0.6; // 1.0 (white) to 0.4 (orange)
            b = 1.0 - orangeIntensity; // 1.0 (white) to 0.0 (orange)
        } else if (radius < whiteRadius) {
            // White to black gradient (middle to edge)
            const t = (radius - centerRadius) / (whiteRadius - centerRadius);
            r = 1.0 - t;
            g = 1.0 - t;
            b = 1.0 - t;
        } else {
            // Fully black at edges
            r = 0;
            g = 0;
            b = 0;
        }
        
        colors[i3] = r;
        colors[i3 + 1] = g;
        colors[i3 + 2] = b;
        
        // Size gradient - larger at center
        const normalizedRadius = radius / 400;
        sizes[i] = (1 - normalizedRadius * 0.7) * 0.5 + 0.1;
    }
    
    const diskGeometry = new THREE.BufferGeometry();
    diskGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    diskGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    diskGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const diskMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true
    });
    
    const disk = new THREE.Points(diskGeometry, diskMaterial);
    galaxyDisk.add(disk);
    
    // Store particle data for animation (create a copy)
    disk.userData.originalPositions = new Float32Array(positions);
    
    galaxyGroup.add(galaxyDisk);
    scene.add(galaxyGroup);
    
    return { blackHole: blackHole, galaxyGroup: galaxyGroup, galaxyDisk: galaxyDisk, centerSphere: centerSphere, glowSphere0: glowSphere0, glowSphere1: glowSphere1, glowSphere2: glowSphere2, glowSphere3: glowSphere3, innerRing: innerRing };
}

// Load the 3D boat model from Blender
let boat = null;

function loadBoatModel() {
    // Initialize GLTFLoader - handle both global and THREE namespace versions
    const LoaderClass = typeof GLTFLoader !== 'undefined' ? GLTFLoader : 
                        (typeof THREE !== 'undefined' && THREE.GLTFLoader ? THREE.GLTFLoader : null);
    
    if (!LoaderClass) {
        console.error('GLTFLoader not found. Please ensure the GLTFLoader script is loaded.');
        console.error('Check the browser console for loading errors.');
        // Create a visible placeholder so you can still see the boat
        const placeholder = new THREE.Mesh(
            new THREE.BoxGeometry(12, 4, 4),
            new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: 0.35 })
        );
        placeholder.position.set(-380, 10, -30); // Start position for straight-line sailing
        scene.add(placeholder);
        boat = placeholder;
        
        return;
    }
    
    // Create loader instance
    // Note: GLTFLoader from ES module should work fine with global THREE
    const loader = new LoaderClass();

    // If DRACOLoader is available, configure it so compressed models load
    if (typeof THREE !== 'undefined' && THREE.DRACOLoader) {
        try {
            const dracoLoader = new THREE.DRACOLoader();
            // Use Google's CDN for decoders (no local files needed)
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
            dracoLoader.setDecoderConfig({ type: 'js' });
            loader.setDRACOLoader(dracoLoader);
            console.log('DRACO loader configured.');
        } catch (e) {
            console.warn('Failed to configure DRACOLoader:', e);
        }
    } else {
        console.warn('THREE.DRACOLoader not found. If your GLB is Draco-compressed, it may not load.');
    }
    
    loader.load(
        'partboat.glb',
        // onLoad callback
        (gltf) => {
            const model = gltf.scene;
            console.log('GLTF loaded. DRACO used:', !!(gltf.parser && gltf.parser.draco));
            
            // Traverse and optimize all meshes for real-time rendering
            model.traverse((child) => {
                if (child.isMesh) {
                    // Enable real-time rendering optimizations
                    child.castShadow = true;
                    child.receiveShadow = true;
                    
                    // Optimize geometry for GPU real-time rendering
                    if (child.geometry) {
                        // Ensure normals are computed for smooth real-time shading
                        if (!child.geometry.attributes.normal) {
                            child.geometry.computeVertexNormals();
                        }
                        // Mark geometry as ready for real-time rendering
                        child.geometry.computeBoundingBox();
                        child.geometry.computeBoundingSphere();
                    }
                    
                    // Optimize materials for real-time rendering and apply custom colors
                    if (child.material) {
                        // Handle both single materials and arrays
                        const materials = Array.isArray(child.material) ? child.material : [child.material];
                        materials.forEach(mat => {
                            if (mat) {
                                // Ensure materials are optimized for real-time
                                mat.needsUpdate = true;
                                
                                // Determine if this is a sail (white material) or boat body (everything else)
                                const isWhiteMaterial = mat.color && mat.color.r > 0.9 && mat.color.g > 0.9 && mat.color.b > 0.9;
                                
                                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                                    mat.flatShading = false; // Smooth shading for better performance
                                    
                                    if (isWhiteMaterial) {
                                        // Keep sails white and bright
                                        mat.color = new THREE.Color(0xffffff);
                                        mat.emissive = new THREE.Color(0xffffff);
                                        mat.emissiveIntensity = 0.5;
                                        mat.metalness = 0.1;
                                        mat.roughness = 0.7;
                                    } else {
                                        // Make boat body brown
                                        mat.color = new THREE.Color(0x8B4513); // Saddle brown
                                        mat.emissive = new THREE.Color(0x6B3410); // Dark brown emissive
                                        mat.emissiveIntensity = 0.3;
                                        mat.metalness = 0.4;
                                        mat.roughness = 0.6;
                                    }
                                }
                            }
                        });
                    }
                }
            });
            
            // Calculate bounding box to determine scale
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            
            // Scale the model to an even LARGER, more imposing size (target size of ~40 units)
            // If model is too small or bounding box is invalid, use a default scale
            const targetSize = 40; // Increased from 25 to 40 for an even bigger presence
            let scale = 1;
            if (maxDim > 0 && maxDim < 1000) {
                scale = targetSize / maxDim;
            } else {
                // Fallback: if bounding box seems wrong, use a larger default scale
                scale = 20; // Increased from 12 to 20
                console.warn('Using default scale, bounding box may be invalid');
            }
            model.scale.set(scale, scale, scale);
            
            // Position closer to the particle edge, starting position for straight-line sailing
            model.position.set(-380, 10, -30); // Start at left edge, closer to particles
            
            // Store the model as boat for animation
            boat = model;
            
            console.log('Boat loaded successfully!');
            console.log('Boat bounding box size:', size);
            console.log('Boat max dimension:', maxDim);
            console.log('Applied scale:', scale);
            console.log('Boat position:', model.position);
            console.log('Boat is now in scene and should be visible');
            
            // Add to scene (this triggers real-time rendering)
            scene.add(model);
    
            // Add multiple bright lights around the boat to illuminate the even larger vessel
            const spotLight = new THREE.SpotLight(0xffffff, 20); // Much brighter for even larger boat
            spotLight.angle = 1.3; // Wider angle to cover larger boat
            spotLight.penumbra = 0.5;
            spotLight.decay = 1; // Less decay
            spotLight.distance = 500; // Increased distance for larger boat
            spotLight.castShadow = true;
            scene.add(spotLight);
            
            const spotLightTarget = new THREE.Object3D();
            spotLight.target = spotLightTarget;
            scene.add(spotLightTarget);
            
            boat.userData.spotlight = spotLight;
            
            // Add additional point lights around the boat for maximum visibility
            const boatLight1 = new THREE.PointLight(0xffffff, 12, 200); // Increased for bigger boat
            boat.userData.boatLight1 = boatLight1;
            scene.add(boatLight1);
            
            const boatLight2 = new THREE.PointLight(0x00ffff, 8, 200); // Increased for bigger boat
            boat.userData.boatLight2 = boatLight2;
            scene.add(boatLight2);
            
            console.log('Party boat model loaded successfully!');
        },
        // onProgress callback
        (progress) => {
            if (progress.lengthComputable) {
                console.log('Loading boat: ' + (progress.loaded / progress.total * 100) + '%');
            }
        },
        // onError callback
        (error) => {
            console.error('Error loading boat model:', error);
            console.error('Make sure partboat.glb is in the same folder as index.html');
            // Fallback placeholder so something is visible
            const placeholder = new THREE.Mesh(
                new THREE.BoxGeometry(12, 4, 4),
                new THREE.MeshStandardMaterial({ color: 0xff00ff, emissive: 0xff00ff, emissiveIntensity: 0.35 })
            );
            placeholder.position.set(-380, 10, -30); // Start position for straight-line sailing
            scene.add(placeholder);
            boat = placeholder;
        }
    );
}


// Create custom colored planets above the black hole
function createCustomPlanets() {
    // Planets in rainbow order, with Brown last
    const planets = [
        { name: 'Rex', color: 0xb82b2f },              // Red
        { name: 'Fargeild', color: 0xe9881e },         // Orange
        { name: 'Emo Jimmy', color: 0xe1c81c },         // Yellow
        { name: 'Timothy', color: 0x2bdd27 },            // Green
        { name: 'David', color: 0x00ffff },             // Cyan
        { name: 'Chair', color: 0x1caaea },             // Light Blue
        { name: 'Mister Smile', color: 0x2424ef },      // Blue
        { name: 'Lurch', color: 0x310282 },             // Indigo
        { name: 'Ein Chantment', color: 0x8f00e1 },     // Violet
        { name: 'Roxo', color: 0xb464d9 },              // Purple
        { name: 'Candy', color: 0xe052a4 },            // Pink
        { name: 'Xander', color: 0xec008c },            // Magenta
        { name: 'Connor', color: 0x4b3524 }             // Brown (last)
    ];
    
    const planetGroup = new THREE.Group();
    
    // Create planets - positions will be animated in infinity loop
    planets.forEach((planet, i) => {
        const planetGeometry = new THREE.SphereGeometry(2.5, 32, 32);
        const planetMaterial = new THREE.MeshStandardMaterial({
            color: planet.color,
            emissive: planet.color,
            emissiveIntensity: 0.4,
            metalness: 0.3,
            roughness: 0.6
        });
        
        const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
        
        // Initial position at origin (will be animated)
        planetMesh.position.set(0, 0, 0);
        
        // Store data
        planetMesh.userData.name = planet.name;
        planetMesh.userData.index = i;
        
        planetGroup.add(planetMesh);
    });
    
    // Position the group at the black hole center (same as black hole)
    planetGroup.position.set(0, 0, -30);
    
    scene.add(planetGroup);
    return planetGroup;
}

// Create orbiting sun and moon
function createSunAndMoon() {
    const celestialGroup = new THREE.Group();
    
    // Create the Sun - large, bright, glowing yellow-orange sphere
    const sunGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffdd00
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.userData.name = 'Sun';
    
    // Add sun glow layers for more dramatic effect
    const sunGlowGeometry = new THREE.SphereGeometry(18, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sunGlow.position.copy(sun.position);
    
    // Add point light to sun for illumination
    const sunLight = new THREE.PointLight(0xffdd00, 3, 500);
    sunLight.position.copy(sun.position);
    
    // Create the Moon - smaller, gray-white sphere
    const moonGeometry = new THREE.SphereGeometry(8, 32, 32);
    const moonMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        emissive: 0x888888,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.8
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.userData.name = 'Moon';
    
    // Add a subtle glow to the moon
    const moonGlowGeometry = new THREE.SphereGeometry(9.5, 32, 32);
    const moonGlowMaterial = new THREE.MeshBasicMaterial({
        color: 0xdddddd,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    const moonGlow = new THREE.Mesh(moonGlowGeometry, moonGlowMaterial);
    moonGlow.position.copy(moon.position);
    
    celestialGroup.add(sun);
    celestialGroup.add(sunGlow);
    celestialGroup.add(sunLight);
    celestialGroup.add(moon);
    celestialGroup.add(moonGlow);
    
    // Store references for animation
    celestialGroup.userData.sun = sun;
    celestialGroup.userData.sunGlow = sunGlow;
    celestialGroup.userData.sunLight = sunLight;
    celestialGroup.userData.moon = moon;
    celestialGroup.userData.moonGlow = moonGlow;
    
    // Position at black hole center
    celestialGroup.position.set(0, 0, -30);
    
    scene.add(celestialGroup);
    return celestialGroup;
}

// Movement variables
const moveSpeed = 0.5;
const mouseSensitivity = 0.002;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

let yaw = 0;
let pitch = 0;

// Event listeners for keyboard
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
        case 'Space': moveUp = true; event.preventDefault(); break;
        case 'ShiftLeft': moveDown = true; break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
        case 'Space': moveUp = false; event.preventDefault(); break;
        case 'ShiftLeft': moveDown = false; break;
    }
});

// Mouse look control
let isLeftMouseDown = false;
let isRightMouseDown = false;
let isMiddleMouseDown = false;

document.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Left mouse button
        isLeftMouseDown = true;
    } else if (event.button === 1) { // Middle mouse button
        isMiddleMouseDown = true;
        event.preventDefault();
    } else if (event.button === 2) { // Right mouse button
        isRightMouseDown = true;
        event.preventDefault();
    }
});

document.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
        isLeftMouseDown = false;
    } else if (event.button === 1) {
        isMiddleMouseDown = false;
    } else if (event.button === 2) {
        isRightMouseDown = false;
    }
});

// Prevent context menu on right-click
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

document.addEventListener('mousemove', (event) => {
    // Left mouse: Look around (rotate view)
    if (isLeftMouseDown) {
        yaw -= event.movementX * mouseSensitivity;
        pitch -= event.movementY * mouseSensitivity;
        
        // Clamp pitch to prevent flipping
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
        
        camera.rotation.order = 'YXZ';
        camera.rotation.y = yaw;
        camera.rotation.x = pitch;
    }
    
    // Right mouse or middle mouse: Pan the camera
    if (isRightMouseDown || isMiddleMouseDown) {
        const panSpeed = 0.5;
        
        // Get the camera's right and up vectors
        const right = new THREE.Vector3(1, 0, 0);
        const up = new THREE.Vector3(0, 1, 0);
        
        // Apply camera rotation to vectors
        right.applyEuler(camera.rotation);
        up.applyEuler(camera.rotation);
        
        // Pan camera based on mouse movement
        const panX = right.multiplyScalar(-event.movementX * panSpeed);
        const panY = up.multiplyScalar(event.movementY * panSpeed);
        
        camera.position.add(panX);
        camera.position.add(panY);
    }
});

// Mouse wheel: Zoom in/out (move camera forward/backward)
document.addEventListener('wheel', (event) => {
    event.preventDefault();
    
    const zoomSpeed = 2;
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyEuler(camera.rotation);
    
    // Zoom based on wheel delta
    const zoomAmount = event.deltaY > 0 ? zoomSpeed : -zoomSpeed;
    direction.multiplyScalar(zoomAmount);
    
    camera.position.add(direction);
}, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize scene
camera.position.set(100, 30, 100); // Start positioned to see the boat orbit area

// Initialize camera rotation to look at the black hole/boat orbit area
const lookAtPosition = new THREE.Vector3(0, 0, -30);
const direction = new THREE.Vector3().subVectors(lookAtPosition, camera.position).normalize();
yaw = Math.atan2(direction.x, direction.z);
pitch = Math.asin(-direction.y);
camera.rotation.order = 'YXZ';
camera.rotation.y = yaw;
camera.rotation.x = pitch;

createStarfield();
// createPlanets(); // Planets removed
const blackHole = createBlackHole();
loadBoatModel(); // Load the party boat 3D model
const customPlanets = createCustomPlanets(); // Your custom colored planets!
const sunAndMoon = createSunAndMoon(); // Orbiting sun and moon

// Animation variables
let time = 0;
let boatPosition = -380; // Track boat's X position for straight-line movement

// Main render loop - optimized for real-time rendering
function animate() {
    requestAnimationFrame(animate);

    // Increment time for animations (frame-rate independent)
    const deltaTime = 0.016; // ~60fps target
    time += deltaTime;

    // Rotate the entire galaxy continuously
    if (blackHole.galaxyGroup) {
        blackHole.galaxyGroup.rotation.y += 0.002; // Slow, majestic rotation
        
        // Pulse the center sphere with orange gradient (no light reflections)
        if (blackHole.centerSphere) {
            // Calculate pulsing intensity (0 to 1)
            const pulseIntensity = Math.sin(time * 0.8) * 0.5 + 0.5;
            
            // Interpolate between black and orange based on pulse
            const r = Math.floor(pulseIntensity * 255);
            const g = Math.floor(pulseIntensity * 102); // 0x66 in orange
            const b = Math.floor(pulseIntensity * 0);
            
            const pulseColor = (r << 16) + (g << 8) + b;
            
            // Pulse color (MeshBasicMaterial doesn't react to lights)
            blackHole.centerSphere.material.color.setHex(pulseColor);
            
            // Also slightly scale the sphere
            blackHole.centerSphere.scale.setScalar(0.95 + pulseIntensity * 0.15);
        }
        
        // Pulse the glow spheres with orange gradient
        if (blackHole.glowSphere0) {
            const pulse0 = Math.sin(time * 0.6) * 0.3 + 0.7;
            blackHole.glowSphere0.material.opacity = pulse0;
            blackHole.glowSphere0.scale.setScalar(1 + Math.sin(time * 0.6) * 0.05);
        }
        
        if (blackHole.glowSphere1) {
            const pulse1 = Math.sin(time * 0.5) * 0.2 + 0.6;
            blackHole.glowSphere1.material.opacity = pulse1;
            blackHole.glowSphere1.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
        }
        
        if (blackHole.glowSphere2) {
            const pulse2 = Math.cos(time * 0.3) * 0.2 + 0.4;
            blackHole.glowSphere2.material.opacity = pulse2;
            blackHole.glowSphere2.scale.setScalar(1 + Math.cos(time * 0.3) * 0.05);
        }
        
        if (blackHole.glowSphere3) {
            const pulse3 = Math.cos(time * 0.4) * 0.15 + 0.15;
            blackHole.glowSphere3.material.opacity = pulse3;
            blackHole.glowSphere3.scale.setScalar(1 + Math.sin(time * 0.4) * 0.03);
        }
        
        // Rotate the inner bright ring
        if (blackHole.innerRing) {
            blackHole.innerRing.rotation.z -= 0.01; // Slowly rotate the ring
            blackHole.innerRing.material.opacity = Math.sin(time * 0.8) * 0.3 + 0.6;
        }
    }
    
    // Update galaxy disk particles for continuous spiral motion
    if (blackHole.galaxyDisk) {
        const particles = blackHole.galaxyDisk.children[0];
        if (particles && particles.geometry) {
            const positions = particles.geometry.attributes.position;
            const originalPositions = particles.userData.originalPositions;
            
            if (originalPositions) {
                for (let i = 0; i < positions.count; i++) {
                    const i3 = i * 3;
                    
                    // Get original spiral parameters
                    const x = originalPositions[i3];
                    const z = originalPositions[i3 + 2];
                    
                    // Calculate angle and radius
                    const angle = Math.atan2(x, z);
                    const radius = Math.sqrt(x * x + z * z);
                    
                    // Rotation speed decreases with distance (differential rotation, like real galaxies)
                    const rotationSpeed = 0.02 / (1 + radius * 0.01);
                    const newAngle = angle + rotationSpeed * time * 50;
                    
                    // Get original height
                    const originalHeight = originalPositions[i3 + 1];
                    
                    // Update spiral structure
                    const spiralTightness = Math.pow(radius / 400, 1.5);
                    const spiralAngle = newAngle + radius * 0.5 * spiralTightness;
                    
                    // Update positions
                    positions.array[i3] = Math.cos(spiralAngle) * radius;
                    positions.array[i3 + 1] = originalHeight + Math.sin(newAngle * 2 + radius * 0.1) * 15; // Wave effect
                    positions.array[i3 + 2] = Math.sin(spiralAngle) * radius;
                }
                
                positions.needsUpdate = true;
            }
        }
    }
    
    // Animate the boat sailing in a straight line across the void
    if (boat) {
        // Move boat horizontally in a straight line, closer to particle edge (radius ~380)
        const sailSpeed = 0.3; // Speed of forward movement
        boatPosition += sailSpeed;
        
        // Wrap around when boat reaches the right edge
        if (boatPosition > 380) {
            boatPosition = -380;
        }
        
        const orbitHeight = 10 + Math.sin(time * 0.5) * 2; // Gentler, smoother vertical bobbing
        
        // Boat sails in a straight line along the X axis, closer to the particle edge
        boat.position.set(boatPosition, orbitHeight, -30);
        
        // Make boat face forward (sailing in the +X direction)
        boat.rotation.y = Math.PI / 2;
        
        // Add very gentle tilting/rolling motion like smooth sailing
        boat.rotation.x = Math.sin(time * 0.8) * 0.05; // Much gentler and slower
        boat.rotation.z = Math.cos(time * 0.8) * 0.08; // Reduced tilting amplitude
        
        // Update boat matrix for efficient real-time rendering
        boat.updateMatrixWorld(true); // Update all children matrices
        
        // Sails are now static - no individual part animation
        
        // Add a spotlight that follows the boat (adjusted for larger boat sailing in straight line)
        if (boat.userData.spotlight) {
            boat.userData.spotlight.position.set(boatPosition, orbitHeight + 30, -30 + 15); // Higher and slightly forward
            boat.userData.spotlight.target.position.set(boatPosition, orbitHeight, -30);
            boat.userData.spotlight.target.updateMatrixWorld();
        }
        
        // Update point lights around the boat (positioned further out for larger boat)
        if (boat.userData.boatLight1) {
            boat.userData.boatLight1.position.set(boatPosition + 25, orbitHeight + 15, -30); // Wider spread for bigger boat
        }
        if (boat.userData.boatLight2) {
            boat.userData.boatLight2.position.set(boatPosition - 25, orbitHeight + 15, -30); // Wider spread for bigger boat
        }
    }
    
    // Move planets in an infinity sign (∞) loop, always high above camera
    if (customPlanets) {
        // Keep planet group always above the camera
        customPlanets.position.y = camera.position.y + 80; // Always 80 units above camera
        
        // Animate each planet along an infinity loop path
        customPlanets.children.forEach((planet, i) => {
            // Calculate offset time for each planet so they're spaced along the loop
            const planetTime = time * 0.3 + (i / customPlanets.children.length) * Math.PI * 2;
            
            // Infinity symbol parametric equations (∞)
            const infinitySize = 65;
            const x = infinitySize * Math.sin(planetTime);
            const z = infinitySize * Math.sin(planetTime) * Math.cos(planetTime);
            
            // Update position relative to group center (which is at black hole center)
            planet.position.set(x, 0, z); // Y stays at 0 (height handled by group)
            
            // Rotate each planet on its own axis
            planet.rotation.y += 0.005;
        });
    }
    
    // Animate sun and moon orbiting around the black hole
    if (sunAndMoon) {
        const sun = sunAndMoon.userData.sun;
        const sunGlow = sunAndMoon.userData.sunGlow;
        const sunLight = sunAndMoon.userData.sunLight;
        const moon = sunAndMoon.userData.moon;
        const moonGlow = sunAndMoon.userData.moonGlow;
        
        if (sun && moon) {
            // Sun orbits in a large circular path
            const sunOrbitRadius = 200;
            const sunOrbitSpeed = 0.001; // Slow, majestic orbit
            const sunAngle = time * sunOrbitSpeed;
            const sunX = Math.cos(sunAngle) * sunOrbitRadius;
            const sunY = Math.sin(sunAngle * 0.3) * 30; // Gentle vertical bobbing
            const sunZ = Math.sin(sunAngle) * sunOrbitRadius;
            
            sun.position.set(sunX, sunY, sunZ);
            sunGlow.position.set(sunX, sunY, sunZ);
            sunLight.position.set(sunX, sunY, sunZ);
            
            // Animate sun glow pulsing
            sunGlow.material.opacity = 0.3 + Math.sin(time * 2) * 0.15;
            sunGlow.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
            
            // Rotate sun on its axis
            sun.rotation.y += 0.002;
            
            // Moon orbits opposite to the sun, in a smaller orbit
            const moonOrbitRadius = 180;
            const moonOrbitSpeed = 0.0015; // Slightly faster than sun
            const moonAngle = time * moonOrbitSpeed + Math.PI; // Start opposite to sun
            const moonX = Math.cos(moonAngle) * moonOrbitRadius;
            const moonY = Math.sin(moonAngle * 0.4) * 25; // Different vertical pattern
            const moonZ = Math.sin(moonAngle) * moonOrbitRadius;
            
            moon.position.set(moonX, moonY, moonZ);
            moonGlow.position.set(moonX, moonY, moonZ);
            
            // Subtle moon glow pulse
            moonGlow.material.opacity = 0.15 + Math.sin(time * 1.5) * 0.08;
            
            // Rotate moon on its axis (slower than sun)
            moon.rotation.y += 0.001;
        }
    }

    // Calculate movement direction
    const direction = new THREE.Vector3();
    
    if (moveForward) direction.z -= moveSpeed;
    if (moveBackward) direction.z += moveSpeed;
    if (moveLeft) direction.x -= moveSpeed;
    if (moveRight) direction.x += moveSpeed;
    if (moveUp) direction.y += moveSpeed;
    if (moveDown) direction.y -= moveSpeed;

    // Apply rotation to movement direction
    direction.applyEuler(camera.rotation);
    camera.position.add(direction);
    
    // Real-time rendering - optimized for browser performance
    renderer.render(scene, camera);
    
    // Update camera matrix for frustum culling optimizations
    camera.updateMatrixWorld();
}

animate();

