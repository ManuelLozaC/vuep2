<template>
  <div class="container mt-5">
    <h1>{{ isEdit ? 'Editar Usuario' : 'Registrar Usuario' }}</h1>
    <form @submit.prevent="submitForm">
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
      <button type="submit" class="btn btn-success">{{ isEdit ? 'Guardar Cambios' : 'Registrar' }}</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      isEdit: false,
      user: {
        name: '',
        lastName: '',
        phone: '',
        id: null,
      },
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['registerUser', 'editUser']),
    async submitForm() {
      if (this.isEdit && this.user.id) {
        await this.editUser(this.user);
        alert('Perfil actualizado exitosamente.');
      } else {
        await this.registerUser(this.user);
        alert('Usuario registrado exitosamente. Ahora puede iniciar sesión.');
      }
      this.$router.push('/login');
    },
  },
  mounted() {
    if (this.user) {
      this.isEdit = true;
      this.user = { ...this.user }; // Clonar usuario para evitar que se cambie accidentalmente
    }
  },
};
</script>