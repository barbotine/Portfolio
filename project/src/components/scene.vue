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

  //Mesh 
  private sun! : THREE.Mesh;
  private mercure! : THREE.Mesh; 
  private venus! : THREE.Mesh; 
  private earth!: THREE.Mesh; 
  private mars! : THREE.Mesh;
  private jupiter! : THREE.Mesh; 
  private saturne! : THREE.Mesh;
  private uranus! : THREE.Mesh;
  private neptune! : THREE.Mesh; 
  
  //Planet
  private sunPlanet : Planet; 
  private mercurePlanet : Planet;
  private venusPlanet : Planet; 
  private earthPlanet : Planet; 
  private marsPlanet : Planet; 
  private jupiterPlanet : Planet; 
  private saturnePlanet : Planet; 
  private uranusPlanet : Planet; 
  private neptunePlanet : Planet; 
  
  //Background
  private skyBoxGeo : THREE.BoxGeometry; 
  private skyBox : THREE.Mesh; 
  private skyBoxMaterial : THREE.Material; 

  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 

    // Planet
    this.sunPlanet = new Planet(6, 37, "img/sun.jpg"); 
    this.sun = this.sunPlanet.getMesh(); 

    this.mercurePlanet = new Planet(5, -35, "img/mercure.jpg")
    this.mercure = this.mercurePlanet.getMesh(); 

    this.venusPlanet= new Planet(2, 5,"img/venus.jpg"); 
    this.venus = this.venusPlanet.getMesh(); 

    this.earthPlanet = new Planet(5, 15, "img/earth.jpg"); 
    this.earth = this.earthPlanet.getMesh(); 

    this.marsPlanet = new Planet(9, -10, "img/mars.jpg"); 
    this.mars = this.marsPlanet.getMesh(); 
    
    this.jupiterPlanet = new Planet(4, 25,"img/jupiter.jpg");
    this.jupiter = this.jupiterPlanet.getMesh(); 

    this.saturnePlanet = new Planet(3, -25, "img/saturne.jpg")
    this.saturne = this.saturnePlanet.getMesh(); 

    this.neptunePlanet = new Planet(4, 49,"img/neptune.jpg"); 
    this.neptune = this.neptunePlanet.getMesh(); 

    this.uranusPlanet = new Planet(5, -47, "img/uranus.jpg"); 
    this.uranus = this.uranusPlanet.getMesh(); 

    //Background
    this.skyBoxGeo = new THREE.BoxGeometry(10, 10, 10);
    this.skyBoxMaterial = new THREE.MeshBasicMaterial({color:0x00ff00})
    this.skyBox = new THREE.Mesh(this.skyBoxGeo, this.skyBoxMaterial);
    this.skyBox.position.setY(20)
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

    solarSystem.add(this.jupiter, this.earth, this.venus, this.sun, this.mars, this.mercure, this.saturne, this.neptune, this.uranus, this.skyBox)
    this.scene.add (solarSystem);
  
    this.camera.position.setZ(100);
    this.camera.position.setX(1);

    const animate = () => {
      requestAnimationFrame(animate);
      this.sunPlanet.rotatePlanete(this.sun)
      this.mercurePlanet.rotatePlanete(this.mercure)
      this.venusPlanet.rotatePlanete(this.venus)
      this.earthPlanet.rotatePlanete(this.earth)
      this.marsPlanet.rotatePlanete(this.mars)
      this.jupiterPlanet.rotatePlanete(this.jupiter)
      this.saturnePlanet.rotatePlanete(this.saturne)
      this.uranusPlanet.rotatePlanete(this.uranus)
      this.neptunePlanet.rotatePlanete(this.neptune)

      this.skyBox.rotation.x += 0.001;
      this.skyBox.rotation.y += 0.001;

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

