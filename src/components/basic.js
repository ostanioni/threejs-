// import * as THREE from 'build/three.module'
import { 
    Scene,
    AmbientLight,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    ArrowHelper

} from 'build/three.module'

// import {ArrowHelper} from 'helpers/ArrowHelper'
// import {OrbitControls} from 'jsm/controls/OrbitControls';
import { fromEvent } from 'rxjs'
// import {WEBGL} from 'webgl.js'


const log = msg => console.log(msg)

let scene, camera, renderer, light, cube, controls, Lab, animate

let cameraPosition = {
    x:0, 
    y: 20,
    z: 100
}


const viewPort = {
    get height() {
        return document.documentElement.clientHeight
    }, 
    get width() {
        return document.documentElement.clientWidth 
    },
    get aspect() {
        return this.width/this.height
    }
}


fromEvent(window, 'resize').subscribe(() => {
    renderer.setSize(viewPort.width, viewPort.height)
    camera.aspect = viewPort.aspect
})
fromEvent(window, 'keypress').subscribe((e) => {
    switch(e.code.toString()){
        case 'KeyW': camera.position.z -=0.5; log('up');log(camera.position.z); break;
        case 'KeyS': camera.position.z +=0.5;  log('down'); break;
        case 'KeyD': camera.position.x -=0.5; log('right'); break;
        case 'KeyA': camera.position.x +=0.5;  log('left'); log(camera.position.x);break;
        default: break;
    }
    // log(e.code)
})

class Basic {

    constructor() {
        Lab = this

        Lab.createScene()
        Lab.addLight(0xffffff)
        Lab.addCamera()
        Lab.addCube()
        Lab.mountRenderer()
        // controls = new OrbitControls( camera, renderer.domElement )
        // controls.update()
        Lab.addArrows()
        
        animate = function() {        
            requestAnimationFrame( animate )
            renderer.render(scene, camera)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            cube.rotation.z += 0.02
            
            // controls.update()
        }
        animate()
        
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
        scene = new Scene()
    }
    addLight(color) {
        light = new AmbientLight(color)
        scene.add(light)
    }
    addCamera() {
        camera = new PerspectiveCamera( 45, viewPort.aspect, 1, 1000 )
        camera.position.z = 5
        camera.position.y = 2
        camera.position.x = 3
        // camera.position.set( cameraPosition.x, cameraPosition.y, cameraPosition.z )
        // camera.position = cameraPosition
        scene.add(camera)
    }
    mountRenderer() {
        const cnvs = document.getElementById('f380-sgji-38fx')
        renderer = new WebGLRenderer({canvas: cnvs})
        renderer.setSize(viewPort.width, viewPort.height)
    }
    
    start(func) {
        requestAnimationFrame( func )
    }
    sceneAdd(mesh) {
        scene.add(mesh)
    }
    addCube() {
        const geometry = new BoxGeometry()
        const material = new MeshBasicMaterial( { color: 0x00ff00 } )
        cube = new Mesh( geometry, material )
        this.sceneAdd(cube)
    }
    addControls() {
        const controls = new OrbitControls( camera, renderer.domElement )
        controls.update()
    }
    addArrows() {
        const origin = new Vector3( 0, 0, 0 )
        const length = 10

        const dirX = new Vector3( 10, 0, 0 )
        const red = 0xff0000
        const arrowHelperX = new ArrowHelper( dirX, origin, length, red )
        scene.add( arrowHelperX )

        const dirY = new Vector3( 0, 10, 0 )
        const green = 0x00ff00
        const arrowHelperY = new ArrowHelper( dirY, origin, length, green )
        scene.add( arrowHelperY )
        
        
        const dirZ = new Vector3( 0, 0, 10 )
        const blue = 0x0000ff
        const arrowHelperZ = new ArrowHelper( dirZ, origin, length, blue )
        scene.add( arrowHelperZ )
    }
}
export {Basic}