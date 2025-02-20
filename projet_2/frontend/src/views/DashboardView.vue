<template>
  <div class="dashboard">
    <h2>Bienvenue sur votre Dashboard</h2>
    <p>Vous êtes connecté(e)!</p>
  </div>
</template>

<script>
export default {
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  margin-top: 50px;
}

h2 {
  color: #42b983;
}
</style>
