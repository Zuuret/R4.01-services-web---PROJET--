<template>
  <div>
    <h2 v-if="authenticated">Vous êtes connecté</h2>
    <h2 v-else>Vous n'êtes pas connecté</h2>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      authenticated: false
    };
  },
  async created() {
    try {
      const res = await fetch('/api/checkAuth', {
        credentials: 'include'
      });
      const data = await res.json();
      this.authenticated = data.authenticated;
    } catch (err) {
      console.error('Erreur lors de la vérification :', err);
    }
  }
};
</script>
