import * as THREE from 'build/three.module'
import { fromEvent } from 'rxjs'

const log = msg => console.log(msg)

let scene, camera, renderer, mesh, light, lab

let cameraPositionSet = [0, 20, 100]


fromEvent(window, 'resize').subscribe(() => renderer.setSize(window.innerWidth, window.innerHeight))


class Basic {

    constructor() {
        lab = this

        lab.createScene()
        lab.addLight(0xffffff)
        lab.addCamera()
        lab.addCube()
        lab.mountRenderer()
        lab.animate()
        
        
        this.n = 5
       alert('hello')
       log('hello')
    }

    addPipe() {

    }
    addTees() {

    }
    addBends() {

    }
    addSprinkler() {

    }
    createScene() {
        scene = new THREE.Scene()
        log('scene')

    }
    addLight(color) {
        light = new THREE.AmbientLight(color)
        scene.add(light)
        log('light')
    }
    addCamera() {
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1.0, 10000 )
        camera.position.set( ...cameraPositionSet )
        scene.add(camera)
    }
    mountRenderer() {
        const cnvs = document.getElementById('f380-sgji-38fx')
        renderer = new THREE.WebGLRenderer({canvas: cnvs})
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    animate() {
        
        renderer.render(scene, camera)
        /*
        requestAnimationFrame( animate )
        cube.rotation.x += 0.01
		cube.rotation.y += 0.01
        cube.rotation.z += 0.02
        */
       console.log('animate')
    }
    addCube() {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
    }

}
export {Basic}