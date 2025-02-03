<template>
  <div>
    <h2>Connexion</h2>
    <input v-model="username" placeholder="Nom d'utilisateur" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        }, { withCredentials: true });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Échec de l'authentification");
      }
    }
  }
};
</script>
