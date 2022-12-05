import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui'; // Debug
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */

// Debug
// const gui = new dat.GUI(); // sert à créer une interface graphique pour modifier les paramètres de la scène (debug)

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Fonts
const fontLoader = new FontLoader()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader(); // permet de charger des textures

const matCapTexture = textureLoader.load('/textures/matcaps/8.png')
const matCapTexture2 = textureLoader.load('/textures/matcaps/4.png')
const matCapTexture3 = textureLoader.load('/textures/matcaps/7.png')

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

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

const roofColorTexture = textureLoader.load('/textures/roof/color.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/normal.jpg')
const roofRoughnessTexture = textureLoader.load('/textures/roof/roughness.jpg')
const roofMetallicTexture = textureLoader.load('/textures/roof/metallic.jpg')

/**
 * House
 */

// House container
const house = new THREE.Group() // permet de regrouper des objets
scene.add(house)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4), // géométrie de la maison
  new THREE.MeshStandardMaterial({ // matériau de la maison
    map: bricksColorTexture, // texture de la maison
    aoMap: bricksAmbientOcclusionTexture, // texture de l'occlusion ambiante
    normalMap: bricksNormalTexture, // texture de la normale
    roughnessMap: bricksRoughnessTexture // texture de la rugosité
  })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)) // permet de dupliquer les coordonnées de texture pour les utiliser dans le shader
walls.position.y = 1.25
scene.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4), // géométrie du toit
  new THREE.MeshStandardMaterial({
    map: roofColorTexture, // texture du toit
    aoMap: roofAmbientOcclusionTexture, // texture de l'occlusion ambiante
    normalMap: roofNormalTexture, // texture de la normale
    roughnessMap: roofRoughnessTexture, // texture de la rugosité
    metalnessMap: roofMetallicTexture // texture de la métalité
  }) // matériau du toit
)
roof.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2)) // permet de dupliquer les coordonnées de texture pour les utiliser dans le shader

roofColorTexture.repeat.set(8, 8) // permet de répéter la texture 8 fois sur l'axe x et 8 fois sur l'axe y
roofAmbientOcclusionTexture.repeat.set(8, 8)
roofNormalTexture.repeat.set(8, 8)
roofRoughnessTexture.repeat.set(8, 8)

roofColorTexture.wrapS = THREE.RepeatWrapping // permet de répéter la texture sur l'axe x
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping // permet de répéter la texture sur l'axe y
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping

roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + 0.5
house.add(roof)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20), // géométrie du plan
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture
    }) // matériau du plan
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

grassColorTexture.repeat.set(8, 8) // permet de répéter la texture 8 fois sur l'axe x et 8 fois sur l'axe y
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping // permet de répéter la texture sur l'axe x
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping // permet de répéter la texture sur l'axe y
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

floor.rotation.x = - Math.PI * 0.5 // rotation du plan, pour qu'il soit horizontal
floor.position.y = 0 // position du plan sur l'axe y (hauteur)
scene.add(floor)

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100), // géométrie de la porte (100x100 pour avoir une meilleure qualité)
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
const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture3 })


// fetch('https://randomuser.me/api/?results=50')
//   .then(response => response.json())
//   .then(data => {
  //     data.results.forEach(user => {
    //       const { first, last } = user.name
    //       names.push(`${first} ${last}`)
    //     })
    //   })


for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3.5 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = Math.random() * Math.PI * 2

    // ecrire le nom du mort
fontLoader.load(
    'fonts/droid_sans_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'R.I.P',
            {
                font: font,
                size: 0.10,
                height: 0.05,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 5,
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.z = 0.1
        grave.add(text)
    }
)

    grave.castShadow = true
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
const doorLight = new THREE.PointLight('#ff7d46', 1, 7) // Couleur, intensité, distance
doorLight.position.set(0, 2.2, 2.7) // Position
house.add(doorLight)

// Back light
const backWallLight = new THREE.PointLight('#ff7d46', 1, 7) // Couleur, intensité, distance
backWallLight.position.set(0, 2.2, -2.7) // Position
house.add(backWallLight)

/**
 * Fog
 */
 const fog = new THREE.Fog('#262837', 1, 15) // Couleur, distance minimale, distance maximale
 scene.fog = fog

 /**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

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
 * Shadows
 */
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

floor.receiveShadow = true

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

ghost1.shadow.mapSize.width = 256 // largeur de la carte d'ombre
ghost1.shadow.mapSize.height = 256 // hauteur de la carte d'ombre
ghost1.shadow.camera.far = 7 // distance maximale de la carte d'ombre

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

backWallLight.shadow.mapSize.width = 256
backWallLight.shadow.mapSize.height = 256
backWallLight.shadow.camera.far = 7

/**
 * Debug
 */

// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière ambiante
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001) // ajout d'un slider pour modifier l'intensité de la lumière directionnelle
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe x
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe y
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001) // ajout d'un slider pour modifier la position de la lumière directionnelle sur l'axe z


/**
 * Animate
 */

const clock = new THREE.Clock() // horloge pour gérer le temps

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime() // récupération du temps écoulé depuis le début de l'animation

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

        // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera) // rendu de la scène

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
