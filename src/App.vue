<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Vehículos</router-link>
      <div class="d-flex"> <!-- Utilizar d-flex para alinear los botones -->
        <!-- Enlaces para login y registro -->
        <router-link v-if="user" class="btn btn-outline-success me-2" :to="{ name: 'myVehicles' }">Mis Vehículos</router-link>
        <router-link v-if="!user" class="btn btn-outline-primary me-2" to="/login">Iniciar Sesión</router-link>
        <router-link v-if="!user" class="btn btn-outline-success me-2" to="/register">Registrarse</router-link>

        <!-- Botón para cerrar sesión -->
        <button v-if="user" class="btn btn-danger" @click="handlelogout">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['logout']),
    handlelogout() {
      this.logout(); 
      this.$router.push('/login'); // Redirigir al login
    },
  },
};
</script>

<style>
/* Puedes añadir estilos personalizados aquí */
</style>