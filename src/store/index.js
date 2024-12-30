import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Persistencia en localStorage
    vehicles: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario
      } else {
        localStorage.removeItem('user'); // Limpiar sesión
      }
    },
    setVehicles(state, vehicles) {
      state.vehicles = vehicles;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const { data: users } = await axios.get('http://localhost:3000/users');
      const user = users.find(
        u => u.name === credentials.name && u.phone === credentials.phone
      );
      if (user) {
        commit('setUser', user);
        return true;
      } else {
        throw new Error('Usuario no encontrado');
      }
    },
    logout({ commit }) {
      commit('setUser', null);
    },
    async fetchVehicles({ commit }) {
      const { data } = await axios.get('http://localhost:3000/vehicles');
      commit('setVehicles', data);
    },
    async addVehicle({ state, dispatch }, vehicle) {
      if (!state.user) throw new Error('No autenticado');
      vehicle.userId = state.user.id;
      await axios.post('http://localhost:3000/vehicles', vehicle);
      dispatch('fetchVehicles');
    },
  },
});
