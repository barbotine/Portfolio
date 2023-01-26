<template>
  <div id="app">
    <p> coucou </p>
    <nav>
    <router-link to="/Creation">Coucou</router-link>
    </nav>
    <Scene/>
    <router-view/>
  </div>
</template>

<script>
import Scene from "./components/scene.vue";
import Creation from "./components/creation.vue"; 

export default {
  name: "App",
  components: {
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
