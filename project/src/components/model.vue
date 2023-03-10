<template>
    <div class="model" ref="model"></div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { Mesh, Object3D, ShaderMaterial } from 'three';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  import { __values } from 'tslib';
  import { Sky } from 'three/examples/jsm/objects/Sky.js';

  @Component<Model>({
  })
  export default class Model extends Vue {
    private camera = new THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    private scene: THREE.Scene = new THREE.Scene();
    private cubeGeometry = new THREE.BoxGeometry(1, 1, 1); 
    private cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFFC0CB} );
    private cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial); 
    private loader = new GLTFLoader();
    private quitComponent : boolean; 
    private objectRequin : THREE.Object3D; 
    private controls : any; 
    private sky = new Sky();

    private uniformData = 

    //water
    private objectWater : THREE.Object3D; 

    constructor(){
      super();
      this.quitComponent = false; 
      this.objectRequin = new Object3D(); 
      this.objectWater = new Object3D();       
    }
 
  vertexShader()
  {
    return `
    void main()
    {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
    }
    `;
  }

  fragmentShader()
  {
  return `
      void main()
      {
         gl_FragColor = vec4( 0.0, 0.0, 1.0, 0.3);
      }
  `;
  }

    mounted(){
      this.init(); 
      this.initScene(); 
      this.initOrbitControls(); 
      this.animate();
    }

    init(){
      this.initRenderer(); 
      this.initCamera();
      this.loadModel(); 
      this.initLight(); 
      this.initSky(); 
      this.initSun(); 
      this.initWater(); 
    }
  
    initRenderer(){
      const container = this.$refs.model as Element;
      this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    }

    initScene(){
      this.scene.background = new THREE.Color( 0xADD8E6);
    }

    initSky(){
      this.sky.scale.setScalar(100);
      this.scene.add(this.sky);
    }

    initSun(){
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      const sun = new THREE.Vector3();

      // Defining the x, y and z value for our 3D Vector
      const theta = Math.PI * (0.49 - 0.5);
      const phi = 2 * Math.PI * (0.205 - 0.5);
      sun.x = Math.cos(phi);
      sun.y = Math.sin(phi) * Math.sin(theta);
      sun.z = Math.sin(phi) * Math.cos(theta);

      this.sky.material.uniforms['sunPosition'].value.copy(sun);
      this.scene.environment = pmremGenerator.fromScene(this.scene).texture;
      return sun;
    } 

    initWater(){
      const geometry = new THREE.BoxGeometry(50, 5, 50, 50, 50, 50);
      const material = new THREE.ShaderMaterial({ 
        side :THREE.DoubleSide, 
        vertexShader : this.vertexShader(), 
        fragmentShader : this.fragmentShader()
        }); 
      const plane = new THREE.Mesh( geometry, material );
      this.scene.add(plane)
    }

    
    async loadModel(){
      const requin = await this.loader.loadAsync('./requin.glb')
      this.scene.add(requin.scene); 
      this.objectRequin = requin.scene; 
      this.objectRequin.position.y = 5;  

    }
  
    initCube(){
      this.scene.add(this.cube)
    }
  
    initCamera(){
      this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); 
      this.camera.position.z = 10; 
    }
  
    initOrbitControls(){
      this.controls = new OrbitControls( this.camera, this.renderer.domElement );
      this.controls.update();
    }
  
    animate(){
      if(this.quitComponent)
        return; 
      requestAnimationFrame(this.animate);
      this.controls.update(); 
      this.objectRequin.rotation.y += 0.001;
      this.renderer.render(this.scene, this.camera);
    }

    initLight(){
      const directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
      this.scene.add( directionalLight );
    }
  
    initHelpers(){
      const axesHelper = new THREE.AxesHelper( 5 );
      this.scene.add( axesHelper );
    }
  
    beforeDestroy(){
      this.quitComponent = true; 
    }
  }
  
  </script>
  <style scoped lang="scss">
  .model {
    width: 100%;
    height: 100%;
  }
  </style>