<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Vehículos</router-link>
      <div>
        <!-- Enlaces para login y registro -->
        <router-link v-if="!user" class="btn btn-outline-primary me-2" to="/login">Iniciar Sesión</router-link>
        <router-link v-if="!user" class="btn btn-outline-success" to="/register">Registrarse</router-link>

        <!-- Botón para cerrar sesión -->
        <button v-if="user" class="btn btn-danger" @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </nav>
  <router-view></router-view> <!-- Asegúrate de incluir router-view -->
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