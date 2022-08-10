<template>
  <div id="app">
    <navigationBar/>
    <Scene/>
  </div>
</template>

<script>
import Scene from "./components/scene.vue";
import navigationBar from "./components/navigationBar.vue"; 

export default {
  name: "App",
  components: {
    navigationBar, 
    Scene
  }
};


</script>

<style scoped>
  #app {
    height: 100vh;
    width: 100vw;
  }
</style>
