<template>
  <div class="scene" ref="scene"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three'; 
import Planet from '../Planet'
 
@Component<Scene>({
})
export default class Scene extends Vue {
  private camera!: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
  private backgroundScene! : THREE.Texture; 

  private earth!: THREE.Mesh; 
  private jupiter! : THREE.Mesh; 
  private venus! : THREE.Mesh; 
  private sun! : THREE.Mesh;
  private mars! : THREE.Mesh;
  private saturne! : THREE.Mesh;  
  private mercure! : THREE.Mesh; 
  private neptune! : THREE.Mesh; 
  private uranus! : THREE.Mesh;
 
  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 

    const earth = new Planet(5, 20, "img/earth.jpg"); 
    this.earth = earth.getMesh(); 

    const jupiter = new Planet(4, 30,"img/jupiter.jpg");
    this.jupiter = jupiter.getMesh(); 

    const sun = new Planet(6, 40, "img/sun.jpg"); 
    this.sun = sun.getMesh(); 

    const mars = new Planet(9, -20, "img/mars.jpg"); 
    this.mars = mars.getMesh(); 

    const saturne = new Planet(3, -35, "img/saturne.jpg")
    this.saturne = saturne.getMesh(); 

    const mercure = new Planet(5, -45, "img/mercure.jpg")
    this.mercure = mercure.getMesh(); 

    const venus = new Planet(2, 10,"img/venus.jpg"); 
    this.venus = venus.getMesh(); 

    const neptune = new Planet(4, 50,"img/neptune.jpg"); 
    this.neptune = neptune.getMesh(); 

    const uranus = new Planet(5, -50, "img/uranus.jpg"); 
    this.uranus = uranus.getMesh(); 

    this.scene.background = this.backgroundScene; 
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;}); 
  }

  mounted(){
    this.init(); 
    const solarSystem = new THREE.Group(); 
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 1000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
 
    container.appendChild(this.renderer.domElement);

    solarSystem.add(this.jupiter, this.earth, this.venus, this.sun, this.mars, this.mercure, this.saturne, this.neptune, this.uranus)
    this.scene.add (solarSystem);
  
    this.camera.position.setZ(100);
    this.camera.position.setX(1);

    const animate = () => {
      requestAnimationFrame(animate);
      this.earth.rotation.x += 0.001;
      this.earth.rotation.y += 0.001;
      this.jupiter.rotation.x += 0.001;
      this.jupiter.rotation.y += 0.001;
      this.venus.rotation.x += 0.001;
      this.venus.rotation.y += 0.001;
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

