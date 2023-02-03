<template>
  <div id="app">
    <nav id="nav">
      <router-link class ="element" to="/">Home</router-link>
      <router-link class ="element" to="/Cv">CV</router-link>
      <router-link class ="element" to="/Creation">Créations</router-link>
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

  #nav {
    background-color: #FFFFFF;
    display : flex; 
  }

  .element{
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
</style>
