<template>
  <div id="app">
    <nav>
    <router-link to="/Creation">Coucou</router-link>
    <router-link to="/Cv">Je suis le cv</router-link>
    <router-link to="/"></router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
};

</script>

<style scoped>
  #app {
    height: 100vh;
    width: 100vw;
  }
</style>
