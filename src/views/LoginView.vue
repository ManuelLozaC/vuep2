<template>
    <div class="container mt-5">
      <h1>Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="credentials.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input v-model="credentials.phone" type="tel" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        credentials: {
          name: '',
          phone: '',
        },
      };
    },  
    methods: {
      ...mapActions(['login']),
      async handleLogin() {
        try {
          const success = await this.login(this.credentials);
          if (success) {
            alert('Sesión iniciada correctamente.');
            this.$router.push('/');
          }
        } catch (error) {
          alert('Error al iniciar sesión: ' + error.message);
        }
      },
    },
  };
  </script>
  