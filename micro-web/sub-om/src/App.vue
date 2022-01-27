<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/blob">Blob</router-link> |
    <router-link to="/gzip">Gzip</router-link> |
    <router-link to="/css">Css</router-link> |
    <router-link to="/labs">Labs</router-link> |
    <router-link to="/online">online</router-link> |
    <router-link to="/dark">dark</router-link> |
    <router-link to="/capsule">capsule</router-link> |
    <router-link to="/model">model</router-link> 
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
