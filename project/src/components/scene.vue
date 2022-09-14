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

  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 

    
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

    this.saturnePlanet = new Planet(3, 75, "img/saturne.jpg")
    this.saturne = this.saturnePlanet.getMesh(); 
    this.saturneGroup.add(this.saturneGroup)

    this.uranusPlanet = new Planet(3, 90, "img/uranus.jpg"); 
    this.uranus = this.uranusPlanet.getMesh(); 
    this.uranusGroup.add(this.uranus)

    this.neptunePlanet = new Planet(3, 100,"img/neptune.jpg"); 
    this.neptune = this.neptunePlanet.getMesh(); 
    this.neptuneGroup.add(this.neptune)

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

    //Background
    this.skyBoxGeo = new THREE.BoxGeometry(700, 700, 700);
    this.skyBoxMaterial = new THREE.MeshBasicMaterial({color:0x00ff00})
    this.skyBox = new THREE.Mesh(this.skyBoxGeo, materialArray);
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;}); 
  }

  mounted(){
    this.init(); 
    const solarSystem = new THREE.Group(); 
    const container = this.$refs.scene as Element;
  
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 45, 30000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
 
    container.appendChild(this.renderer.domElement);

    solarSystem.add(this.sun, this.mercuryGroup, this.venusGroup, this.earthGroup, this.marsGroup, this.jupiterGroup, this.saturneGroup, this.uranusGroup, this.neptuneGroup)
    this.scene.add(this.skyBox, solarSystem);
  
    this.camera.position.setZ(100);
    this.camera.position.setX(1);

    // this.mercuryContainer.position.set(this.moonOrbitRadius, 0, 0);
    // this.sunContainer.position.set(this.sunOrbitRadius, 0, 0);
    const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60); 
    const animate = () => {
     

      this.sun.rotation.y += 0.001; 
      this.mercuryGroup.rotation.y += EARTH_YEAR / 0.16 ; 
      this.venusGroup.rotation.y += EARTH_YEAR / 0.70; 
      this.earthGroup.rotation.y += EARTH_YEAR; 
      this.marsGroup.rotation.y += EARTH_YEAR / 1.88 ; 
      this.jupiterGroup.rotation.y += EARTH_YEAR / 12; 
      this.saturneGroup.rotation.y += EARTH_YEAR / 29; 
      this.uranusGroup.rotation.y += EARTH_YEAR / 84;
      this.saturneGroup.rotation.y += EARTH_YEAR / 165;  
     
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

