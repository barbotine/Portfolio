<template>
  <div class="cv" ref="cv"></div>
</template>

<script lang="ts">
import THREE from 'three';
import { Component, Vue } from 'vue-property-decorator';
@Component<Cv>({
})
export default class Cv extends Vue {
  private camera = new THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  private scene: THREE.Scene = new THREE.Scene();

}

</script>
<style scoped lang="scss">
    
</style>