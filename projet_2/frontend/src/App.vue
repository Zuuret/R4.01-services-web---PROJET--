<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/signup">Inscription</router-link>
      <router-link to="/login">Connexion</router-link>
      <router-link v-if="user" to="/dashboard">Dashboard</router-link>
      <button v-if="user" @click="logout">Déconnexion</button>
    </nav>
    <router-view />
    <footer>
      <p>KHERZA Yahia | VIDY Enzo - Tous droits réservés</p>
    </footer>
  </div>
</template>

<script>
import { logout } from "@/services/authService";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    logout() {
      logout();
      this.user = null;
    },
  },
  watch: {
    $route() {
      this.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  created() {
    window.addEventListener("storage", () => {
      this.user = JSON.parse(localStorage.getItem("user"));
    });
  },
};
</script>


<style scoped>
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  background: #42b983;
  padding: 10px;
  border-radius: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: darkred;
}

footer {
  margin-top: 20px;
  padding: 10px;
  background: #42b983;
  color: white;
  border-radius: 10px;
}
</style>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #2c3e50;
}
</style>
