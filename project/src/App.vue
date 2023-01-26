<template>
  <div id="app">
    <nav>
    <router-link to="/Creation">Coucou</router-link>
    <router-link to="/Cv">Je suis le cv</router-link>
    </nav>
    <router-view/>
    <Scene/>
  </div>
</template>

<script>
import Scene from "./components/scene.vue";

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
