<template>
  <div class="scene" ref="scene"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as THREE from 'three'; 
import Planet from '../Planet'
import { SphereGeometry } from 'three';
 
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

  
  // private venus! : THREE.Mesh; 
  // private earth!: THREE.Mesh; 
  // private mars! : THREE.Mesh;
  // private jupiter! : THREE.Mesh; 
  // private saturne! : THREE.Mesh;
  // private uranus! : THREE.Mesh;
  // private neptune! : THREE.Mesh; 
  
  //Planet

  private mercury : Planet;
  private venus : Planet; 
  private earth : Planet; 
  // private marsPlanet : Planet; 
  // private jupiterPlanet : Planet; 
  // private saturnePlanet : Planet; 
  // private uranusPlanet : Planet; 
  // private neptunePlanet : Planet; 

  private mercuryGroup = new THREE.Group();
  // private earthGroup = new THREE.Group();
  // private venusGroup = new THREE.Group();
  // private marsGroup = new THREE.Group();
  // private jupiterGroup = new THREE.Group();
  // private saturneGroup = new THREE.Group();
  // private uranusGroup = new THREE.Group();
  // private neptuneGroup = new THREE.Group();

  //Background
  private skyBoxGeo : THREE.BoxGeometry; 
  private skyBox : THREE.Mesh;
  private skyBoxMaterial : THREE.Material

   private solarSystem = new THREE.Group(); 

  initializePlanet(){
    
    this.geometrySun = new THREE.SphereGeometry(15, 50, 50); 
    this.textureFile = "img/sun.jpg"; 
    this.textureSun = new THREE.TextureLoader().load(this.textureFile);
    this.materialSun = new THREE.MeshBasicMaterial({map : this.textureSun});  
    this.meshSun = new THREE.Mesh(this.geometrySun, this.materialSun)


    this.mercury = new Planet(0.40, 20, 0.001, 2, "img/mercure.jpg"); 
    this.venus = new Planet(0.70, 25, 0.001, 2 , "img/venus.jpg");
    this.earth = new Planet(1,35, 0.001, 5, "img/earth.jpg"); 

    // this.venusPlanet= new Planet(2, 25,"img/venus.jpg"); 
  

    // this.earthPlanet = new Planet(5, 35, "img/earth.jpg"); 
    

    // this.marsPlanet = new Planet(4, 45, "img/mars.jpg"); 
    
    
    // this.jupiterPlanet = new Planet(4, 60,"img/jupiter.jpg");
    

    // this.saturnePlanet = new Planet(3, 65, "img/saturne.jpg")
   

    // this.uranusPlanet = new Planet(4, 70, "img/uranus.jpg"); 
    

    // this.neptunePlanet = new Planet(4, 85,"img/neptune.jpg"); 
   
  }

  createBackground(){
    //Load textures
    let materialArray = []; 

    const ft = new THREE.TextureLoader().load("img/background/space_bk.png");
    const bk = new THREE.TextureLoader().load("img/background/space_dn.png");
    const up = new THREE.TextureLoader().load("img/background/space_ft.png");
    const dn = new THREE.TextureLoader().load("img/background/space_lf.png");
    const rt = new THREE.TextureLoader().load("img/background/space_rt.png");
    const lf = new THREE.TextureLoader().load("img/background/space_up.png");

    materialArray.push(new THREE.MeshBasicMaterial({map : ft})); 
    materialArray.push(new THREE.MeshBasicMaterial({map : bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map : up}));
    materialArray.push(new THREE.MeshBasicMaterial({map : dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map : rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map : lf}));     

    for (let i = 0; i<6; i++){
      materialArray[i].side = THREE.BackSide; 
    }

    this.skyBoxGeo = new THREE.BoxGeometry(700, 700, 700);
    this.skyBoxMaterial = new THREE.MeshBasicMaterial({color:0x00ff00})
    this.skyBox = new THREE.Mesh(this.skyBoxGeo, materialArray);
  }

  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.initializePlanet(); 
    this.createBackground(); 
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;}); 
  }

  mounted(){
    this.init(); 
   
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 45, 30000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
 
    container.appendChild(this.renderer.domElement);
    this.scene.add(this.skyBox, this.meshSun, this.mercury.getGroup(), this.venus.getGroup(), this.earth.getGroup());
    console.log(this.mercury.getGroup()); 
  
    this.camera.position.setZ(120);
    this.camera.position.setX(1);

    const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60); 
    const animate = () => {
      this.meshSun.rotation.y += 0.001; 
      this.mercury.rotation(); 
      this.venus.rotation(); 
      this.earth.rotation(); 
      // this.rotate(this.mercuryGroup, 0.40, EARTH_YEAR); 
      // this.rotate(this.venusGroup, 0.70, EARTH_YEAR); 
      // this.rotate(this.earthGroup, 1, EARTH_YEAR); 
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

