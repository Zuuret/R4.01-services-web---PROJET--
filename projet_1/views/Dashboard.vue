<template>
  <div>
    <h2>Tableau de bord</h2>
    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/me', { withCredentials: true });
      console.log("Utilisateur connecté :", response.data);
    } catch (error) {
      console.error("Non authentifié");
      this.$router.push('/');
    }
  },
  methods: {
    async logout() {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      this.$router.push('/');
    }
  }
};
</script>
