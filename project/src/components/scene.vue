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
  private loader = new THREE.TextureLoader(); 

  mounted(){
    const container = this.$refs.scene as Element;
    this.camera = new THREE.PerspectiveCamera(
  100, 
  innerWidth / innerHeight, 
  0.1, 
  1000
  ); 

  this.renderer.setSize(container.clientWidth, container.clientHeight);
  this.renderer.setPixelRatio(window.devicePixelRatio); 
  this.renderer.setClearColor(0xffffff, 1); 
  container.appendChild(this.renderer.domElement);

  const renderer = new THREE.WebGLRenderer(
    {
      antialias : true, alpha : true
    }
  )
  const texture = new THREE.TextureLoader().load("/img/earth.jpg");
  const geometry = new THREE.SphereGeometry(5, 50, 50);
  const material = new THREE.MeshBasicMaterial({map : texture});
  const sphere = new THREE.Mesh(geometry, material);
  
  this.scene.add(sphere);
  this.camera.position.z = 8;

  const animate = () => {
     requestAnimationFrame(animate);
     sphere.rotation.x += 0.001;
     sphere.rotation.y += 0.001;
     this.renderer.render(this.scene, this.camera);
    
     
   };
   animate();
  }
}
</script>
<style scoped lang="scss">
.scene {
  width: 100%;
  height: 100%;
}
</style>

