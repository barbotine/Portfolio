<template>
  <div class="scene" ref="scene"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three'; 
import Planet from '../Planet'
import Background from '../Background'
import { Group, SphereGeometry } from 'three';
 
@Component<Scene>({
})
export default class Scene extends Vue {
  private camera = new THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();
 

  // Sun
  private geometrySun = new SphereGeometry(); 
  private textureSun = new THREE.Texture; 
  private materialSun = new THREE.Material; 
  private textureFile : string; 
  private meshSun = new THREE.Mesh(); 


  private mercury : Planet;
  private venus : Planet; 
  private earth : Planet; 
  private mars : Planet; 
  private jupiter : Planet; 
  private saturne : Planet; 
  private uranus : Planet; 
  private neptune : Planet; 

  private skyBox : THREE.Mesh; 


  //Background

  private planets : Planet[] = []; 
  

  initializePlanet(){
    this.geometrySun = new THREE.SphereGeometry(15, 50, 50); 
    this.textureFile = "img/sun.jpg"; 
    this.textureSun = new THREE.TextureLoader().load(this.textureFile);
    this.materialSun = new THREE.MeshBasicMaterial({map : this.textureSun});  
    this.meshSun = new THREE.Mesh(this.geometrySun, this.materialSun)


    this.mercury = new Planet(0.40, 20, 0.001, 2, "img/mercure.jpg"); 
    this.venus = new Planet(0.70, 25, 0.001, 2 , "img/venus.jpg");
    this.earth = new Planet(1, 35, 0.001, 5, "img/earth.jpg");
    this.mars = new Planet(1.88, 45, 0.001, 4, "img/mars.jpg"); 
    this.jupiter = new Planet(8, 60, 0.001, 4, "img/jupiter.jpg"); 
    this.saturne = new Planet(3, 65, 0.001, 2,  "img/saturne.jpg" ); 
    this.uranus = new Planet(7,70, 0.001, 4, "img/uranus.jpg");
    this.planets.push(this.mercury, this.venus, this.earth, this.mars, this.jupiter, this.saturne, this.uranus); 
  }

  rotateAllPlanet(){
    this.planets.forEach((planet) => {
      planet.rotation(); 
    } )
  }

  createBackground() : THREE.Mesh{
    const background = new Background(); 
    return background.getSkyBox(); 
}

  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.initializePlanet(); 
    this.skyBox = this.createBackground(); 
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;}); 
  }

  getAllGroups() : Group[]{
    let groups : Group[] = [] 
    this.planets.forEach((planet)=> {
      groups.push(planet.getGroup())
    })
    return groups; 
  }

  mounted(){
    this.init(); 
   
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 45, 30000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 

 
    container.appendChild(this.renderer.domElement);
    this.scene.add(this.skyBox, this.meshSun, ...this.getAllGroups());
  
  
    this.camera.position.setZ(120);
    this.camera.position.setX(1);

    const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60); 
    const animate = () => {
      this.meshSun.rotation.y += 0.001; 
      this.rotateAllPlanet(); 
   
      // this.rotate(this.marsGroup, 1.88, EARTH_YEAR); 
      // this.rotate(this.jupiterGroup, 5, EARTH_YEAR); 
      // this.rotate(this.saturneGroup, 8, EARTH_YEAR); 
      // this.rotate(this.uranusGroup, 3, EARTH_YEAR); 
      // this.rotate(this.neptuneGroup, 7, EARTH_YEAR); 

      this.skyBox.rotation.y += 0.001;

      requestAnimationFrame(animate);
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

