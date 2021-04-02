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
    GridHelper,
    MeshLambertMaterial,    

} from 'build/three.module'
import {EventDispatcher} from 'core/EventDispatcher'

// import {ArrowHelper} from 'helpers/ArrowHelper'
import {OrbitControls} from 'jsm/controls/OrbitControls'
import {DragControls} from 'jsm/controls/DragControls'
import { fromEvent } from 'rxjs'
// import {WEBGL} from 'webgl.js'


const log = msg => console.log(msg)

let scene, camera, renderer, light, cube, orbitControls, dragControls, Lab, animate, cylinder

const Pipes = []
const Tees = []

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
        Lab.addPipe()
        Lab.mountRenderer()
        Lab.addCamera()
        orbitControls = new OrbitControls( camera, renderer.domElement )
        // controls.update()
        Lab.addAxis()
        Lab.addTube()
        Lab.addGrid()
        
        animate = function() {        
            requestAnimationFrame( animate )
            renderer.render(scene, camera)
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            cube.rotation.z += 0.02
            
            orbitControls.update()
        }
        

        dragControls = new DragControls( [cube, ...Pipes], camera, renderer.domElement );

        // add event listener to highlight dragged objects

        dragControls.addEventListener( 'dragstart', function ( event ) {

	        orbitControls.enabled = false
            event.object.material.emissive.set( 0xaaaaaa );
            cylinder.geometry.computeBoundingBox()
            console.log(cylinder)


        } );

        dragControls.addEventListener( 'dragend', function ( event ) {

	        event.object.material.emissive.set( 0x000000 );
            orbitControls.enabled = true

        } );
        animate()
    }

    addPipe() {
        let opt = {
            radiusTop: 5,
            radiusBottom: 5,
            heigt: 20,
            radiusSegments: 10,
            heightSegments: 10,
            openEnded: true,
            // thetaStart: 0,
            // thetaLength: 2*pi
        }
        // THREE.CylinderBufferGeometry
        var cylGeometry = new THREE.CylinderGeometry( 5,5,20,10,10,true, 0 );
        var cylMaterial = new THREE.MeshLambertMaterial( {
            color: 0xffff00, 
            wireframe: true,
            skinning: true        
        } )
        cylinder = new THREE.Mesh( cylGeometry, cylMaterial );
        cylinder.openEnded = false
        cylinder.rotateX(2)
        
        Pipes.push( cylinder )
        scene.add( cylinder );
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
         /*
        scene.add(camera)
        const helper = new THREE.CameraHelper( camera )
        scene.add( helper )
       
        const light = new THREE.DirectionalLight( 0xFFFFFF );
        const helper_ = new THREE.DirectionalLightHelper( light, 5 );
        scene.add( helper_ )
        */
        

        camera.lookAt( 0, 0, 0 );
        
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
    addCube() {
        const geometry = new BoxGeometry()
        const material = new THREE.MeshLambertMaterial( { color: 0xfeb74c, wireframe: true} )
        // const material = new MeshDepthMaterial( { wireframe: true } )
        cube = new Mesh( geometry, material )
        this.sceneAdd(cube)
    }
    sceneAdd(mesh) {
        scene.add(mesh)
    }
    addControls() {
        const controls = new OrbitControls( camera, renderer.domElement )
        controls.update()
    }
    createScene() {
        scene = new Scene()
        scene.background = new THREE.Color( 0x101010 )
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
    addAxis() {
        const origin = new Vector3( 0, 0, 0 )
        const length = 10

        const dirX = new Vector3( 100, 0, 0 )
        const red = 0xff0000
        const arrowHelperX = new ArrowHelper( dirX, origin, length, red )
        scene.add( arrowHelperX )

        const dirY = new Vector3( 0, 100, 0 )
        const green = 0x00ff00
        const arrowHelperY = new ArrowHelper( dirY, origin, length, green )
        scene.add( arrowHelperY )
        
        
        const dirZ = new Vector3( 0, 0, 100 )
        const blue = 0x0000ff
        const arrowHelperZ = new ArrowHelper( dirZ, origin, length, blue )
        scene.add( arrowHelperZ )
    }
    addGrid() {
        const gridHelper = new GridHelper( 100, 50 )
		scene.add( gridHelper )
    }
}
export {Basic}