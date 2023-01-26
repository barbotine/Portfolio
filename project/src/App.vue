<template>
  <div id="app">
    <nav>
    <router-link to="/3DCreation">Coucou</router-link>
    </nav>
    <Scene/>
    <navigationBar/>
    <router-view/>
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
