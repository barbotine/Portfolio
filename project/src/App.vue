<template>
  <div id="app">
    <nav id="nav">
      <router-link class ="element" to="/">Home</router-link>
      <router-link class ="element" to="/Cv">CV</router-link>
      <router-link class ="element" to="/Landscape">Landscape</router-link>
      <router-link class ="element" to="/Model">Modèles 3D</router-link>
      <router-link class ="element" to="/Render">Rendus</router-link>
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
    background-color: #000000;
    display : flex; 
    justify-content : center
  }

  .element{
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
</style>
