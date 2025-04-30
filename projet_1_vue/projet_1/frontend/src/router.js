import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue'; // à adapter selon ton arborescence
import SignIn from './SignIn.vue';
import Signup from './Signup.vue'; // Ajouter l'import pour Signup
const routes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: Signup },
// Ajouter la route pour signup
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
