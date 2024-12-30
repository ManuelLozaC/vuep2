<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Vehículos</router-link>
      <div>
        <router-link v-if="!user" class="btn btn-outline-primary me-2" to="/login">Iniciar Sesión</router-link>
        <router-link v-if="!user" class="btn btn-outline-success" to="/register">Registrarse</router-link>
        <button v-if="user" class="btn btn-danger" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    logout() {
      this.logout();
      this.$router.push('/login'); // Redirigir al login
    },
  },
};
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
