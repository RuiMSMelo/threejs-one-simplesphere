import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './styles.css'
import gsap from 'gsap'

// Scene
const scene = new THREE.Scene();


// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: "#12ff24",
    roughness: 0.4,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};


// Light
const lightOne = new THREE.PointLight(0xffffff, 70, 100, 1.5);
lightOne.position.set(0, 10, 10);
scene.add(lightOne);
// Light 2
// const lightTwo = new THREE.PointLight(0xffffff, 70, 100, 1.5);
// lightTwo.position.set(0, 0, -10);
// scene.add(lightTwo);


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 1


//Resize
window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
}) 

const loop = () => {
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}
loop()

//Timeline magic
//allows to synchronize multiple animations together
const tl = gsap.timeline({defaults: {duration: 1.5}})
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo('nav', {y: '-100%'}, { y: '0%'})
tl.fromTo('.title', {opacity: 0}, {opacity: 1})

//Mouse animation color
let mouseDown = false
let rgb = []
window.addEventListener('mousedown', () => (mouseDown = true))
window.addEventListener('mouseup', () => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
    if(mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150
        ]
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
        gsap.to(mesh.material.color, {r: newColor.r, g: newColor.g, b:newColor.b})
    }
})