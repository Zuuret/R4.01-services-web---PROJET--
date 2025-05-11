<template>
    <nav class="indigo">
      <div class="nav-wrapper container">
        <router-link :to="auth ? '/blogs' : '/'" class="brand-logo">
          KHERZA Yahia - VIDY Enzo --- BUT S4 R403 + R401
        </router-link>
        <ul class="right">
          <li v-if="auth === null"></li>
          <li v-else-if="!auth">
            <a @click.prevent="login">Connectez-vous avec Google</a>
          </li>
          <template v-else>
            <li><router-link to="/chat">Chat</router-link></li>
            <li><a @click.prevent="logout">Déconnexion</a></li>
          </template>
        </ul>
      </div>
    </nav>
</template>
  
<script>
  import { computed, onMounted } from 'vue';
  import { useAuthStore } from '../store';
  export default {
    setup() {
      const authStore = useAuthStore();
      onMounted(() => authStore.fetchUser());
      const auth = computed(() => authStore.user);
      const login = () => window.location = 'http://localhost:5000/auth/google';
      const logout = () => window.location = 'http://localhost:5000/auth/logout';
      return { auth, login, logout };
    }
  };
</script>
  
<style scoped>
  .brand-logo { margin-left: 10px; }
</style>
  