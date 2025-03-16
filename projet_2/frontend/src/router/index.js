import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Signup from '@/views/SignupView.vue';
import Login from '@/views/LoginView.vue';
import Dashboard from '@/views/DashboardView.vue';
import { refreshTokenRequest, logout } from "@/services/authService";
import { jwtDecode } from 'jwt-decode';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true }},
  { path: '/:pathMatch(.*)*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = jwtDecode(token);
  return decoded.exp * 1000 < Date.now();
};

router.beforeEach(async (to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.requiresAuth) {
    if (!user || isTokenExpired(user.accessToken)) {
      if (user?.refreshToken) {
        try {
          const response = await refreshTokenRequest(user.refreshToken);
          user.accessToken = response.data.accessToken;
          localStorage.setItem("user", JSON.stringify(user));
          next();
        } catch (error) {
          logout();
          next('/login');
        }
      } else {
        logout();
        next('/login');
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
