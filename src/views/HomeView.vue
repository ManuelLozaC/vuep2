<template>
  <div class="container mt-5">
    <h1>Listado de Vehículos</h1>
    <vehicle-filter @search="applyFilters" />
    <div class="row">
      <vehicle-card
        v-for="vehicle in filteredVehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VehicleCard from '../components/VehicleCard.vue';
import VehicleFilter from '../components/VehicleFilter.vue';

export default {
  components: { VehicleCard, VehicleFilter },
  data() {
    return {
      filters: { searchTerm: '', priceFilter: '' },
    };
  },
  computed: {
    ...mapState(['vehicles']),
    filteredVehicles() {
      let result = this.vehicles;
      if (this.filters.searchTerm) {
        const term = this.filters.searchTerm.toLowerCase();
        result = result.filter(
          (v) =>
            v.brand.toLowerCase().includes(term) ||
            v.model.toLowerCase().includes(term)
        );
      }
      if (this.filters.priceFilter) {
        result = result.filter((v) => v.price > Number(this.filters.priceFilter));
      }
      return result;
    },
  },
  methods: {
    applyFilters(filters) {
      this.filters = filters;
    },
  },
};
</script>