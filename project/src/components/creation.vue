<template>
  <div class="creation" ref="creation"><p>Je suis là</p></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D } from 'three';


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
  private tree : THREE.Object3D; 

  constructor(){
    super();
    this.quitComponent = false; 
    this.tree = new Object3D(); 
  }

  mounted(){
    this.init(); 
    this.animate();
    
  }

  initRenderer(){
    const container = this.$refs.creation as Element;
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);
  } 

  async loadModel(){
    const gltf = await this.loader.loadAsync( './requin.glb'); 
    this.scene.add(gltf.scene); 
    this.tree = gltf.scene; 
  }

  initCube(){
    this.scene.add(this.cube)
    console.log("Je rentre dans le cube"); 
  }

  initCamera(){
    this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); 
    this.camera.position.z = 10; 
  }

  animate(){
    requestAnimationFrame(this.animate);
    this.cube.rotation.x += 0.1; 
    this.cube.rotation.y += 0.1; 
    this.tree.rotation.y += 0.01; 
    this.renderer.render(this.scene, this.camera);
  }

  init(){
    this.initRenderer(); 
    this.initCamera(); 
    //this.initCube(); 
    this.loadModel(); 
    //this.initHelpers()
    this.initLight(); 
    
  }

  initLight(){
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
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
.creation {
  width: 100%;
  height: 100%;
}
</style>