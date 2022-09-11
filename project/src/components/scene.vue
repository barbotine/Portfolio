<template>
  <div class="scene" ref="scene"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three'; 
 
@Component<Scene>({
})
export default class Scene extends Vue {
  private camera!: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private earth!: THREE.Mesh; 
  private geometry!: THREE.SphereGeometry; 
  private material!: THREE.MeshBasicMaterial; 
  private texture! : THREE.Texture; 
  private backgroundScene! : THREE.Texture; 
  private jupiter! : THREE.Mesh; 
 
  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.texture = new THREE.TextureLoader().load("/img/earth.jpg");
    this.geometry = new THREE.SphereGeometry(5, 50, 50);
    this.material = new THREE.MeshBasicMaterial({map : this.texture});
    //mesh
    this.earth = new THREE.Mesh(this.geometry, this.material);
    this.jupiter = new THREE.Mesh(this.geometry, this.material);
    this.scene.background = this.backgroundScene; 
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;  }); 
  }

  mounted(){
    this.init(); 
    const solarSystem = new THREE.Group(); 
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
    this.jupiter.position.setX(10); 
    console.log(this.jupiter.position); 
    console.log(this.earth.position); 
    
    container.appendChild(this.renderer.domElement);

    solarSystem.add(this.jupiter, this.earth)
    this.scene.add (solarSystem);
  
    this.camera.position.setZ(30);
    this.camera.position.setX(1);
    console.log(this.camera.position); 

    const animate = () => {
      requestAnimationFrame(animate);
      this.earth.rotation.x += 0.001;
      this.earth.rotation.y += 0.001;
       this.jupiter.rotation.x += 0.001;
      this.jupiter.rotation.y += 0.001;
      this.scene.background = this.backgroundScene; 
      this.renderer.render(this.scene, this.camera);
   };
   animate();
  }

  destroyed(){
    window.removeEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;  }); 
  }

}
</script>
<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
}
</style>

