import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui'; // Debug
import { MeshStandardMaterial } from 'three';

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

/**
 * House
 */

// House container
const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: '#ac8e82' })
)
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

/**
 * Lights
 */

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5) // lumière ambiante, avec une couleur blanche et une intensité de 0.5
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière ambiante
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5) // lumière directionnelle, avec une couleur blanche et une intensité de 0.5
moonLight.position.set(4, 5, - 2) // position de la lumière directionnelle sur l'axe x, y et z
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière directionnelle
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe x
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe y
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe z
scene.add(moonLight)

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
