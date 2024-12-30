<template>
  <div class="card mb-3" style="width: 18rem;">
    <img v-if="vehicle.photo" :src="vehicle.photo" class="card-img-top" alt="Foto del vehículo" />
    <div class="card-body">
      <h5 class="card-title">{{ vehicle.brand }} - {{ vehicle.model }}</h5>
      <p class="card-text">
        <strong>Tipo:</strong> {{ vehicle.type }}<br />
        <strong>Año:</strong> {{ vehicle.year }}<br />
        <strong>Precio:</strong> ${{ vehicle.price }}
      </p>
      <a
        v-if="getUserPhone(vehicle.userId)"
        :href="`https://wa.me/${getUserPhone(vehicle.userId)}?text=Estoy%20interesado%20en%20su%20vehículo%20${vehicle.brand}%20${vehicle.model}`"
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
  props: {
    vehicle: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['users']),
  },
  methods: {
    getUserPhone(userId) {
      if (!this.users || this.users.length === 0) {
        console.warn("La lista de usuarios está vacía o no se ha cargado.");
        return '';
      }

      const user = this.users.find(u => u.id === userId);
      return user ? user.phone : '';
    },
  },
};
</script>