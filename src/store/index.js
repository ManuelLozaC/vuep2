import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Persistencia en localStorage
    vehicles: [], // Lista de vehículos
  },
  mutations: {
    // Manejo del usuario autenticado
    setUser(state, user) {
      state.user = user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en localStorage
      } else {
        localStorage.removeItem('user'); // Limpiar sesión
      }
    },
    // Actualizar lista de vehículos
    setVehicles(state, vehicles) {
      state.vehicles = vehicles;
    },
    // Agregar un vehículo al estado local
    addVehicle(state, vehicle) {
      state.vehicles.push(vehicle);
    },
    // Editar un vehículo en el estado local
    editVehicle(state, updatedVehicle) {
      const index = state.vehicles.findIndex((v) => v.id === updatedVehicle.id);
      if (index !== -1) {
        state.vehicles.splice(index, 1, updatedVehicle);
      }
    },
    // Eliminar un vehículo del estado local
    deleteVehicle(state, vehicleId) {
      state.vehicles = state.vehicles.filter((v) => v.id !== vehicleId);
    },
  },
  actions: {
    // Login del usuario
    // Login del usuario
    async login({ commit }, credentials) {
      if (!credentials || !credentials.name || !credentials.phone) {
        throw new Error('Nombre y teléfono son obligatorios.');
      }

      const { data: users } = await axios.get('http://localhost:3000/users');
      const name = credentials.name.trim().toLowerCase();
      const phone = String(credentials.phone).trim();
      
      const user = users.find(
        (u) =>
          u.name.trim().toLowerCase() === name &&
          String(u.phone).trim() === phone
      );
      
      if (user) {
        commit('setUser', user);
        return true; // Devuelve éxito explícito
      } else {
        throw new Error('Usuario no encontrado'); // Lanza un error si falla
      }
    },

    // Cerrar sesión del usuario
    logout({ commit }) {
      commit('setUser', null);
    },

    // Registro de un nuevo usuario
    async registerUser(_, user) {
      const { data: users } = await axios.get('http://localhost:3000/users');
      const userExists = users.some(
        (u) => u.name === user.name && u.phone === user.phone
      );
      if (userExists) {
        throw new Error('El usuario ya existe');
      }
      await axios.post('http://localhost:3000/users', user);
    },

    // Obtener la lista de vehículos
    async fetchVehicles({ commit }) {
      const { data } = await axios.get('http://localhost:3000/vehicles');
      commit('setVehicles', data);
    },

    // Agregar un nuevo vehículo
    async addVehicle({ commit, state }, vehicle) {
      if (!state.user) throw new Error('No autenticado');
      vehicle.userId = state.user.id; // Asociar vehículo al usuario autenticado
      try {
        const { data } = await axios.post('http://localhost:3000/vehicles', vehicle);
        commit('addVehicle', data); // Agregar el vehículo al estado local
      } catch (error) {
        console.error('Error al agregar vehículo:', error);
        throw new Error('No se pudo registrar el vehículo');
      }
    },

    // Editar un vehículo existente
    async editVehicle({ commit }, vehicle) {
      if (!vehicle.id) throw new Error('El vehículo no tiene un ID válido');
      try {
        const { data } = await axios.put(`http://localhost:3000/vehicles/${vehicle.id}`, vehicle);
        commit('editVehicle', data); // Actualizar el estado local con el vehículo editado
      } catch (error) {
        console.error('Error al editar vehículo:', error);
        throw new Error('No se pudo actualizar el vehículo');
      }
    },

    // Eliminar un vehículo
    async deleteVehicle({ commit }, vehicleId) {
      try {
        await axios.delete(`http://localhost:3000/vehicles/${vehicleId}`);
        commit('deleteVehicle', vehicleId); // Remover el vehículo del estado local
      } catch (error) {
        console.error('Error al eliminar vehículo:', error);
        throw new Error('No se pudo eliminar el vehículo');
      }
    },
  },
});
