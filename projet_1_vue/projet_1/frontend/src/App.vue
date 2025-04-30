<template>
  <div id="app">
    <h1>Mini projet 1</h1>
    
    <!-- Vérification si l'utilisateur est connecté -->
    <p v-if="userConnected">Salut {{ userLastname }} !</p>

    <!-- Vue Router pour afficher la page active -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userConnected: false,  // Par défaut, l'utilisateur n'est pas connecté
      userLastname: '',      // Variable pour stocker le nom de famille de l'utilisateur
    };
  },
  created() {
    this.checkSession();  // Vérifie si l'utilisateur est connecté lors de l'initialisation
  },
  methods: {
  async checkSession() {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        this.userConnected = true;
        this.userLastname = data.user.lastName;  // Assurez-vous d'utiliser le nom exact des champs
      }
    } catch (err) {
      console.error('Erreur lors de la vérification de la session:', err);
      this.userConnected = false;  // Si erreur, l'utilisateur est considéré comme non connecté
    }
  }
}
};
</script>

<style>
/* Styles pour ton application */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

p {
  font-size: 18px;
  color: #4CAF50;
}

h1 {
  font-size: 36px;
  margin-bottom: 20px;
}
</style>
