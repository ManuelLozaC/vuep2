<template>
    <div class="card mb-3" style="width: 18rem;">
      <img :src="vehicle.photo" class="card-img-top" alt="Foto del vehículo" />
      <div class="card-body">
        <h5 class="card-title">{{ vehicle.brand }} - {{ vehicle.model }}</h5>
        <p class="card-text">
          <strong>Tipo:</strong> {{ vehicle.type }}<br />
          <strong>Año:</strong> {{ vehicle.year }}<br />
          <strong>Precio:</strong> ${{ vehicle.price }}
        </p>
        <a
          :href="`https://wa.me/${getUserPhone(vehicle.userId)}`"
          target="_blank"
          class="btn btn-primary"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    props: ['vehicle'],
    computed: {
      ...mapState(['users']),
    },
    methods: {
      getUserPhone(userId) {
        const user = this.users.find(u => u.id === userId);
        return user ? user.phone : '';
      },
    },
  };
  </script>
  