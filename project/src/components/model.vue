<template>
    <div class="model" ref="model"></div>
</template>
  
<script lang="ts">
import THREE from 'three';
import { Component, Vue } from 'vue-property-decorator';
@Component<Model>({
})
export default class Model extends Vue {
    private camera = new THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    private scene: THREE.Scene = new THREE.Scene();
    private cubeGeometry = new THREE.BoxGeometry(1, 1, 1); 
    private cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xFFC0CB} );
    private cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial); 
    private quitComponent : boolean; 

    constructor(){
        super();
        this.quitComponent = false; 
    }

    mounted(){
        this.init(); 
        this.initScene(); 
        this.animate();
    }

    initRenderer(){
        const container = this.$refs.model as Element;
        this.renderer = new THREE.WebGLRenderer({antialias : true, alpha : true}); 
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);
    } 

    initScene(){
        this.scene.background = new THREE.Color( 0xADD8E6);
    }

    initCube(){
        this.scene.add(this.cube)
    }
    
    initCamera(){
        this.camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000); 
        this.camera.position.z = 0; 
        this.camera.position.y = 0; 
    }

    animate(){
        if(this.quitComponent)
          return; 
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }

    init(){
        this.initRenderer(); 
        this.initCamera(); 
        this.initLight(); 
    }

    initLight(){
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
        this.scene.add( directionalLight );
    }

    beforeDestroy(){
        this.quitComponent = true; 
    }
}
  
</script>
<style scoped lang="scss">
    
</style>