<template>
    <div class="container mt-5">
      <h1>{{ isEdit ? 'Editar Vehículo' : 'Registrar Vehículo' }}</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Tipo</label>
          <select v-model="vehicle.type" class="form-select" required>
            <option value="">Seleccione un tipo</option>
            <option value="vagoneta">Vagoneta</option>
            <option value="camioneta">Camioneta</option>
            <option value="automovil">Automóvil</option>
            <option value="moto">Moto</option>
            <option value="furgon">Furgón</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Marca</label>
          <input v-model="vehicle.brand" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Modelo</label>
          <input v-model="vehicle.model" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Año</label>
          <input v-model="vehicle.year" type="number" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Precio</label>
          <input v-model="vehicle.price" type="number" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Foto</label>
          <input type="file" @change="handleFileUpload" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">
          {{ isEdit ? 'Guardar Cambios' : 'Registrar Vehículo' }}
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    data() {
      return {
        vehicle: {
          type: '',
          brand: '',
          model: '',
          year: '',
          price: '',
          photo: '',
        },
        isEdit: false,
      };
    },
    computed: {
      ...mapState(['user']),
    },
    methods: {
      ...mapActions(['addVehicle', 'fetchVehicles']),
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.vehicle.photo = reader.result; // Base64 string
          };
          reader.readAsDataURL(file);
        }
      },
      async submitForm() {
        if (!this.user) {
          alert('Debe iniciar sesión para agregar un vehículo');
          return;
        }
  
        this.vehicle.userId = this.user.id; // Asocia el vehículo al usuario
        await this.addVehicle(this.vehicle);
        this.$router.push('/');
      },
    },
  };
  </script>
  