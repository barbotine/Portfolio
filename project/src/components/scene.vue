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
  private message! : string|undefined
  private jupiter! : THREE.Mesh; 

  private zoom = (event : undefined) => {
    this.camera.position.z += event.delta
    
  }

  init(){
    this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
    this.texture = new THREE.TextureLoader().load("/img/earth.jpg");
    this.geometry = new THREE.SphereGeometry(5, 50, 50);
    this.material = new THREE.MeshBasicMaterial({map : this.texture});
    this.earth = new THREE.Mesh(this.geometry, this.material);
    this.jupiter = new THREE.Mesh(this.geometry, this.material);
    this.scene.background = this.backgroundScene; 
  }

  created(){
    window.addEventListener('wheel', (event) => {this.camera.position.z += event.deltaY /500;  }); 
  }

  mounted(){
    this.init(); 
    this.jupiter.position.set(-3, 6, 6); 
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(100, innerWidth / innerHeight, 0.1, 1000); 
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); 
    this.renderer.setClearColor(0xffffff, 1); 
    container.appendChild(this.renderer.domElement);

    this.scene.add(this.earth, this.jupiter);
    this.camera.position.z = 8;

    const animate = () => {
      requestAnimationFrame(animate);
      this.earth.rotation.x += 0.001;
      this.earth.rotation.y += 0.001;
      this.scene.background = this.backgroundScene; 
      this.renderer.render(this.scene, this.camera);
   };
   animate();
  }

  destroyed(){
     window.removeEventListener('scroll', this.zoom);
  }

}
</script>
<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
}
</style>

