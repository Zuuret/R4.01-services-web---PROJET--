<template>
  <div class="home">
    <h1>Bienvenue sur notre application Vue.js</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Une application de démonstration de l'authentification avec JWT.</p>
    <router-link to="/signup" class="btn">Créer un compte</router-link>
    <router-link to="/login" class="btn">Se connecter</router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}

img {
  width: 200px;
}

.btn {
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
}

.btn:hover {
  background: #2e8b57;
}
</style>
