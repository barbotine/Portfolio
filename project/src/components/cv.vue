<template>
  <div class="cv" ref="cv"></div>
</template>

<script lang="ts">
import * as THREE from 'three';
import { Component, Vue } from 'vue-property-decorator';
import Background from '@/Background'
@Component<Cv>({
})
export default class Cv extends Vue {
  private camera = new THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private skyBox : THREE.Mesh; 
  private quitComponent : boolean;
  private earth = new THREE.Mesh(); 

  mounted(){
    this.init(); 
    this.scene.add(this.skyBox, this.earth); 
    this.animate(); 
  }

  initEarth(){
    const geometryEarth = new THREE.SphereGeometry(15, 50, 50); 
    const textureFile = "img/earth.jpg"; 
    const textureEarth = new THREE.TextureLoader().load(textureFile);
    const materialEarth = new THREE.MeshBasicMaterial({map : textureEarth}); 
    this.earth = new THREE.Mesh(geometryEarth, materialEarth)
    this.earth.position.z = 80; 
  }

  init(){
    this.skyBox = this.createBackground(); 
    this.initRenderer()
    this.initCamera(); 
    this.initEarth(); 
  }

  constructor(){
    super();
    this.skyBox = new THREE.Mesh(); 
    this.quitComponent = false; 
  }

  initRenderer(){
    const container = this.$refs.cv as Element;
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
    container.appendChild(this.renderer.domElement);
  }

   initCamera(){
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 45, 30000); 
    this.camera.position.setZ(150);
    this.camera.position.setX(1);
  }

  animate(){
    requestAnimationFrame(this.animate); 
    this.renderer.render(this.scene, this.camera);
    this.earth.rotation.y += 0.005; 
  }

  createBackground() : THREE.Mesh{
    const background = new Background(); 
    return background.getSkyBox(); 
  }

  beforeDestroy(){
    this.quitComponent = true; 
  }
}

</script>
<style scoped lang="scss">
   .cv {
  width: 100%;
  height: 100%;
}
</style>