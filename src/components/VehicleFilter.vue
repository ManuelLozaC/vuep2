<template>
    <div class="mb-4">
      <input
        v-model="searchTerm"
        @input="updateFilter"
        type="text"
        class="form-control mb-2"
        placeholder="Buscar por marca o modelo"
      />
      <select v-model="priceFilter" @change="updateFilter" class="form-select">
        <option value="">Todos los precios</option>
        <option value="10000">Mayor a $10,000</option>
        <option value="20000">Mayor a $20,000</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchTerm: '',
        priceFilter: '',
      };
    },
    methods: {
      updateFilter() {
        this.$emit('search', { searchTerm: this.searchTerm, priceFilter: this.priceFilter });
      },
    },
  };
  </script>
  