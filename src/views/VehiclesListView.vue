<template>
    <div class="container mt-5">
      <h1>Mis Vehículos</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id">
            <td>{{ vehicle.type }}</td>
            <td>{{ vehicle.brand }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.year }}</td>
            <td>
              <router-link :to="{ name: 'editVehicle', params: { id: vehicle.id } }" class="btn btn-sm btn-warning">Editar</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/add-vehicle" class="btn btn-primary">Agregar Vehículo</router-link>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['vehicles']),
    },
    mounted() {
      // Aquí podrías llamar a una acción para cargar los vehículos del usuario
      this.fetchUserVehicles();
    },
    methods: {
      async fetchUserVehicles() {
        // Implementa la función para obtener los vehículos del usuario logueado
        // Llama a la acción de Vuex para obtener los vehículos del usuario
        await this.$store.dispatch('fetchVehicles');
      },
    },
  };
  </script>