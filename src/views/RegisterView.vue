<template>
    <div class="container mt-5">
      <h1>Registrar Usuario</h1>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input v-model="user.name" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Apellido</label>
          <input v-model="user.lastName" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono</label>
          <input v-model="user.phone" type="tel" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Registrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          lastName: '',
          phone: '',
        },
      };
    },
    methods: {
      ...mapActions(['registerUser']),
      async register() {
        try {
          await this.registerUser(this.user);
          alert('Usuario registrado exitosamente. Ahora puede iniciar sesión.');
          this.$router.push('/login');
        } catch (error) {
          alert('Error al registrar usuario.');
        }
      },
    },
  };
  </script>
  