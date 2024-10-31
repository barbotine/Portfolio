<template>
  <div class="scene" ref="scene"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three'; 
import Planet from '@/Planet'
import Background from '@/Background'
import { Group, SphereGeometry } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

@Component<Scene>({
})
export default class Scene extends Vue {
  private camera = new THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();

  private sun = new THREE.Mesh(); 
  private mercury : Planet;
  private venus : Planet; 
  private earth : Planet; 
  private mars : Planet; 
  private jupiter : Planet; 
  private saturne : Planet; 
  private uranus : Planet; 
  private neptune : Planet; 
  private skyBox : THREE.Mesh; 
  private planets : Planet[] = []; 
  private quitComponent : boolean; 
  private controls : any; 

  async init(){
    this.initSun();
    this.skyBox =  await this.createBackground(); 
    this.initRenderer()
    this.initCamera(); 
  }

  async mounted(){
    await this.init(); 
    this.scene.add(this.skyBox, this.sun, ...this.getAllGroups());
    this.initOrbitControls(); 
    this.animate();
  } 


  initSun(){
    const geometrySun = new THREE.SphereGeometry(15, 50, 50); 
    const textureFile = "img/sun.jpg"; 
    const textureSun = new THREE.TextureLoader().load(textureFile);
    const materialSun = new THREE.MeshBasicMaterial({map : textureSun}); 
    this.sun = new THREE.Mesh(geometrySun, materialSun)
  }

  constructor(){
    super();
    this.mercury = new Planet(0.40, 20, 0.001, 2, "img/mercure.jpg"); 
    this.venus = new Planet(0.70, 25, 0.001, 2 , "img/venus.jpg");
    this.earth = new Planet(1, 35, 0.001, 5, "img/earth.jpg");
    this.mars = new Planet(1.88, 45, 0.001, 4, "img/mars.jpg"); 
    this.jupiter = new Planet(8, 60, 0.001, 4, "img/jupiter.jpg"); 
    this.neptune = new Planet(7, 85, 0.001, 4,  "img/neptune.jpg"); 
    this.saturne = new Planet(3, 65, 0.001, 2,  "img/saturne.jpg"); 
    this.uranus = new Planet(3,70, 0.001, 4, "img/uranus.jpg");
    this.skyBox = new THREE.Mesh(); 
    this.quitComponent = false; 
    this.planets.push(this.mercury, this.venus, this.earth, this.mars, this.jupiter, this.saturne, this.uranus, this.neptune); 
  }

  initRenderer(){
    const container = this.$refs.scene as Element;
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
    this.sun.rotation.y += 0.001; 
    this.rotateAllPlanet(); 
    requestAnimationFrame(this.animate); 
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  initOrbitControls(){
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.update();
  }

  rotateAllPlanet(){
    this.planets.forEach((planet) => {
      planet.rotation(); 
    })
  }

  async createBackground(){
    const background = new Background();
    const response = await background.getSkyBox();
    this.scene.environment = response.texture;
    return response.skySphere
 
  }

  getAllGroups() : Group[]{
    let groups : Group[] = [] 
    this.planets.forEach((planet)=> {
      groups.push(planet.getGroup())
    })
    return groups; 
  }

  beforeDestroy(){
    this.quitComponent = true; 
  }
}
</script>
<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
}
</style>

