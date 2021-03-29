import * as THREE from 'build/three.module'
import { 
    Scene,
    AmbientLight,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3,
    ArrowHelper,
    Curve,
    TubeGeometry,
    CameraHelper

} from 'build/three.module'

// import {ArrowHelper} from 'helpers/ArrowHelper'
import {OrbitControls} from 'jsm/controls/OrbitControls'
import {DragControls} from 'jsm/controls/DragControls'
import { fromEvent } from 'rxjs'
// import {WEBGL} from 'webgl.js'


const log = msg => console.log(msg)

let scene, camera, renderer, light, cube, orbitControls, dragControls, Lab, animate

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
        // return this.width/this.height
        return window.innerWidth / window.innerHeight
    }
}


fromEvent(window, 'resize').subscribe(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

    // renderer.setSize(viewPort.width, viewPort.height)
    // camera.aspect = viewPort.aspect
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
        Lab.addCube()
        Lab.mountRenderer()
        Lab.addCamera()
        orbitControls = new OrbitControls( camera, renderer.domElement )
        // controls.update()
        Lab.addArrows()
        Lab.addTube()
        
        animate = function() {        
            requestAnimationFrame( animate )
            renderer.render(scene, camera)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            cube.rotation.z += 0.02
            
            orbitControls.update()
        }
        

        dragControls = new DragControls( [cube], camera, renderer.domElement );

        // add event listener to highlight dragged objects

        dragControls.addEventListener( 'dragstart', function ( event ) {

	        event.object.material.emissive.set( 0xaaaaaa );

        } );

        dragControls.addEventListener( 'dragend', function ( event ) {

	        event.object.material.emissive.set( 0x000000 );

        } );
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
        scene.background = new THREE.Color( 0x101010 )
    }
    addLight(color) {
        light = new AmbientLight(color)
        scene.add(light)
    }
    addCamera() {
        camera = new PerspectiveCamera( 45, viewPort.aspect, 1, 1000 )
        
        // const controls = new OrbitControls( camera, renderer.domElement )
        camera.position.z = 15
        camera.position.y = 2
        camera.position.x = 3
        // controls.update()
        // camera.position.set( cameraPosition.x, cameraPosition.y, cameraPosition.z )
        // camera.position = cameraPosition
        scene.add(camera)
        const helper = new THREE.CameraHelper( camera )
        scene.add( helper )
        
        const light = new THREE.DirectionalLight( 0xFFFFFF );
        const helper_ = new THREE.DirectionalLightHelper( light, 5 );
        scene.add( helper_ )

        const size = 10;
        const divisions = 10;

        const gridHelper = new THREE.GridHelper( size, divisions );
        scene.add( gridHelper );

        //camera.lookAt( 0, 0, 0 );
        
    }
    mountRenderer() {
        const cnvs = document.getElementById('f380-sgji-38fx')
        renderer = new WebGLRenderer({
            canvas: cnvs,
            antialias: true
        })
        renderer.setPixelRatio( window.devicePixelRatio )
		renderer.setSize( window.innerWidth, window.innerHeight )
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
    addTube() {
        class CustomSinCurve extends Curve {

            constructor( scale = 1 ) {
        
                super();
        
                this.scale = scale;
        
            }
        
            getPoint( t, optionalTarget = new Vector3() ) {
        
                const tx = t * 3 - 1.5;
                const ty = Math.sin( 2 * Math.PI * t );
                const tz = 0;
        
                return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        
            }
        
        }        
        const path = new CustomSinCurve( 10 );
        const geometry = new TubeGeometry( path, 20, 1, 8, false );
        const material = new MeshBasicMaterial( { 
            color: 0x49ef4,
            wireframe: true,
            // vertexColors: true
        });
        const mesh = new Mesh( geometry, material );
        scene.add( mesh );
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