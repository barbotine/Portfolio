<template>
    <div class="model" ref="model"></div>
  </template>
  
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { Object3D } from 'three';
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
  
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
    private objectTree : THREE.Object3D; 
    private objectRequin : THREE.Object3D; 
    private controls : any; 
  
    constructor(){
      super();
      this.quitComponent = false; 
      this.objectTree = new Object3D(); 
      this.objectRequin = new Object3D(); 
    }
  
    mounted(){
      this.init(); 
      this.initScene(); 
      this.initOrbitControls(); 
      this.animate();
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
  
    async loadModel(){
      const requin = await this.loader.loadAsync('./requin.glb')
      this.scene.add(requin.scene); 
      this.objectRequin = requin.scene; 
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
  
    init(){
      this.initRenderer(); 
      this.initCamera(); 
      this.loadModel(); 
      this.initLight(); 
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