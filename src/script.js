import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui'; // Debug
import { Group, MeshStandardMaterial } from 'three';

/**
 * Base
 */

// Debug
const gui = new dat.GUI(); // sert à créer une interface graphique pour modifier les paramètres de la scène (debug)

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(); // permet de charger des textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

/**
 * House
 */

// House container
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 1.25
scene.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20), // géométrie du plan
    new THREE.MeshStandardMaterial({ color: '#a9c388' }) // matériau du plan
)
floor.rotation.x = - Math.PI * 0.5 // rotation du plan, pour qu'il soit horizontal
floor.position.y = 0 // position du plan sur l'axe y (hauteur)
scene.add(floor)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Add to the graves container
    graves.add(grave)
}


/**
 * Lights
 */


// Ambient light

const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

/**
 * Fog
 */
 const fog = new THREE.Fog('#262837', 1, 15)
 scene.fog = fog


// // Ambient light
// const ambientLight = new THREE.AmbientLight('#ffffff', 0.5) // lumière ambiante, avec une couleur blanche et une intensité de 0.5
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière ambiante
// scene.add(ambientLight)

// // Directional light
// const moonLight = new THREE.DirectionalLight('#ffffff', 0.5) // lumière directionnelle, avec une couleur blanche et une intensité de 0.5
// moonLight.position.set(4, 5, - 2) // position de la lumière directionnelle sur l'axe x, y et z
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière directionnelle
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe x
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe y
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe z
// scene.add(moonLight)

/**
 * Sizes
 */

const sizes = {
    width: window.innerWidth, // largeur de la fenêtre du navigateur
    height: window.innerHeight // hauteur de la fenêtre du navigateur
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) // caméra en perspective, avec un champ de vision de 75°, une largeur et une hauteur de la fenêtre du navigateur, une distance minimale de 0.1 et une distance maximale de 100
camera.position.x = 4 // position de la caméra sur l'axe x
camera.position.y = 2 // position de la caméra sur l'axe y
camera.position.z = 5 // position de la caméra sur l'axe z
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas) // contrôles de la caméra avec la souris
controls.enableDamping = true // activation de l'effet de flou de la caméra lorsqu'on bouge la souris

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
}) // rendu de la scène en WebGL
renderer.setSize(sizes.width, sizes.height) // taille du rendu de la scène en fonction de la largeur et de la hauteur de la fenêtre du navigateur
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // résolution du rendu de la scène en fonction de la résolution de l'écran (pour éviter les pixels flous)
renderer.setClearColor('#262837')


/**
 * Animate
 */

const clock = new THREE.Clock() // horloge pour gérer le temps

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime() // récupération du temps écoulé depuis le début de l'animation


    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera) // rendu de la scène

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
