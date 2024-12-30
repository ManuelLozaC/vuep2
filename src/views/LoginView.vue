<template>
    <div class="container mt-5">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="credentials.name" type="text" class="form-control" />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input v-model="credentials.phone" type="tel" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        credentials: { name: '', phone: '' },
      };
    },
    methods: {
      ...mapActions(['login']),
      async login() {
        try {
          await this.login(this.credentials);
          this.$router.push('/'); // Redirigir al home
        } catch (error) {
          alert('Error: Usuario no encontrado');
        }
      },
    },
  };
  </script>
  