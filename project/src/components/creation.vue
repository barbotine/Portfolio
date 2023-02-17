<template>
  <div class="creation" ref="creation"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

@Component<Creation>({
})
export default class Creation extends Vue {
  private camera = new THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private cubeGeometry = new THREE.BoxGeometry(1, 1, 1); 
  private cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFFC0CB} );
  private cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial); 
  private loader = new GLTFLoader();
  private quitComponent : boolean; 
  private objectTree : THREE.Object3D; 
  private objectTree2 : THREE.Object3D; 
  private objectTree3 : THREE.Object3D; 
  private objectRequin : THREE.Object3D; 
  private controls : any; 

  constructor(){
    super();
    this.quitComponent = false; 
    this.objectTree = new Object3D(); 
    this.objectTree2 = new Object3D(); 
    this.objectTree3 = new Object3D(); 
    this.objectRequin = new Object3D(); 
  }

  mounted(){
    this.init(); 
    this.initOrbitControls(); 
    this.animate();
  }

  initRenderer(){
    const container = this.$refs.creation as Element;
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);
  } 

  async loadModel(){
    const tree = await this.loader.loadAsync( './tree-low-poly-3.glb'); 
    const tree2 = await this.loader.loadAsync( './tree-low-poly.glb'); 
    const tree3 = await this.loader.loadAsync( './tree-low-poly-2.glb'); 
    const requin = await this.loader.loadAsync('./requin.glb')
    this.scene.add(tree.scene); 
    this.scene.add(requin.scene); 
    //this.scene.add(tree2.scene); 
    //this.scene.add(tree3.scene); 
    this.objectTree = tree.scene; 
    this.objectRequin = requin.scene; 
    this.objectTree2 = tree2.scene; 
    this.objectTree3 = tree3.scene; 
    this.positionObject(); 

  }

  positionObject(){ 
    this.objectRequin.position.y = -10; 
    this.objectTree2.position.x = -10; 
    this.objectTree3.position.x = 10; 
  }

  initCube(){
    this.scene.add(this.cube)
  }

  initCamera(){
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); 
    this.camera.position.z = 10; 
    this.camera.position.y = 5; 
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
    this.objectTree.rotation.y += 0.001;
    this.objectTree2.rotation.y += 0.001;
    this.objectTree3.rotation.y += 0.001;
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
    const directionalLight = new THREE.DirectionalLight( 0xffffff);
    this.scene.add( directionalLight );
    const light = new THREE.AmbientLight( 0x404040 );
    this.scene.add( light );
    const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
    light.position.set( 60, 10, 0 );
    this.scene.add(pointLight);
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
.creation {
  width: 100%;
  height: 100%;
}
</style>