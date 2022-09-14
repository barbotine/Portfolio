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

  private mercuryGroup = new THREE.Group();
  private earthGroup = new THREE.Group();
  private venusGroup = new THREE.Group();
  private marsGroup = new THREE.Group();
  private jupiterGroup = new THREE.Group();
  private saturneGroup = new THREE.Group();
  private uranusGroup = new THREE.Group();
  private neptuneGroup = new THREE.Group();

  //Background
  private skyBoxGeo : THREE.BoxGeometry; 
  private skyBox : THREE.Mesh;
  private skyBoxMaterial : THREE.Material

   private solarSystem = new THREE.Group(); 

  initializePlanet(){
     this.sunPlanet = new Planet(15, 0, "img/sun.jpg"); 
    this.sun = this.sunPlanet.getMesh(); 

    this.mercurePlanet = new Planet(2, 20, "img/mercure.jpg")
    this.mercure = this.mercurePlanet.getMesh(); 
    this.mercuryGroup.add(this.mercure)

    this.venusPlanet= new Planet(2, 25,"img/venus.jpg"); 
    this.venus = this.venusPlanet.getMesh(); 
    this.venusGroup.add(this.venus)

    this.earthPlanet = new Planet(5, 35, "img/earth.jpg"); 
    this.earth = this.earthPlanet.getMesh(); 
    this.earthGroup.add(this.earth)

    this.marsPlanet = new Planet(4, 45, "img/mars.jpg"); 
    this.mars = this.marsPlanet.getMesh(); 
    this.marsGroup.add(this.mars)
    
    this.jupiterPlanet = new Planet(4, 60,"img/jupiter.jpg");
    this.jupiter = this.jupiterPlanet.getMesh(); 
    this.jupiterGroup.add(this.jupiter)

    this.saturnePlanet = new Planet(3, 65, "img/saturne.jpg")
    this.saturne = this.saturnePlanet.getMesh(); 
    this.saturneGroup.add(this.saturneGroup)

    this.uranusPlanet = new Planet(4, 70, "img/uranus.jpg"); 
    this.uranus = this.uranusPlanet.getMesh(); 
    this.uranusGroup.add(this.uranus)

    this.neptunePlanet = new Planet(4, 85,"img/neptune.jpg"); 
    this.neptune = this.neptunePlanet.getMesh(); 
    this.neptuneGroup.add(this.neptune)
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

  rotate(system : THREE.Group, coefEarthYear : number, earthYear : number){
    system.rotation.y += (earthYear / coefEarthYear) *2; 
  }

  mounted(){
    this.init(); 
   
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 45, 30000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
 
    container.appendChild(this.renderer.domElement);
    this.solarSystem.add(this.sun,this.mercuryGroup, this.venusGroup, this.earthGroup, this.marsGroup, this.jupiterGroup, this.saturneGroup, this.uranusGroup, this.neptuneGroup)
    this.scene.add(this.skyBox, this.solarSystem);
  
    this.camera.position.setZ(120);
    this.camera.position.setX(1);
  

    const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60); 
    const animate = () => {
      this.sun.rotation.y += 0.001; 
      this.mercurePlanet.rotatePlanete(this.saturne); 
      this.venusPlanet.rotatePlanete(this.venus); 
      this.earthPlanet.rotatePlanete(this.earth); 
      this.rotate(this.mercuryGroup, 0.40, EARTH_YEAR); 
      this.rotate(this.venusGroup, 0.70, EARTH_YEAR); 
      this.rotate(this.earthGroup, 1, EARTH_YEAR); 
      this.rotate(this.marsGroup, 1.88, EARTH_YEAR); 
      this.rotate(this.jupiterGroup, 5, EARTH_YEAR); 
      this.rotate(this.saturneGroup, 8, EARTH_YEAR); 
      this.rotate(this.uranusGroup, 3, EARTH_YEAR); 
      this.rotate(this.neptuneGroup, 7, EARTH_YEAR); 

      this.skyBox.rotation.y += 0.001;

      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
   };
   animate();
    console.log(this.mercuryGroup.position.x, this.mercuryGroup.position.y, this.mercuryGroup.position.z)
    console.log(this.mercure.position.x, this.mercure.position.x, this.mercure.position.x)
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

