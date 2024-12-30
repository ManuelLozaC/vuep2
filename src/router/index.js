import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import VehicleFormView from '../views/VehicleFormView.vue';
import VehiclesListView from '../views/VehiclesListView.vue';
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/add-vehicle', name: 'addVehicle', component: VehicleFormView },
  { path: '/edit-vehicle/:id', name: 'editVehicle', component: VehicleFormView },
  { path: '/my-vehicles', name: 'myVehicles', component: VehiclesListView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
