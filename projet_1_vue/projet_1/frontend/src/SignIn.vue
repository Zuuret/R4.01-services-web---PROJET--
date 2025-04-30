<template>
  <div>
    <h2>Connexion</h2>
    <form @submit.prevent="signin">
      <label for="email">Adresse e-mail</label>
      <input v-model="email" class="text" name="email" type="email" placeholder="Email" required />

      <label for="password">Mot de passe</label>
      <input v-model="password" name="password" type="password" placeholder="Mot de passe" required />

      <button class="btn" type="submit">Se connecter</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'SigninPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  /* eslint-disable */
  methods: {
    async signin() {
      try {
        // Envoi des données de connexion vers l'API
        const res = await fetch('/api/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!res.ok) throw new Error('Connexion échouée');
        const data = await res.json();

        // Si la connexion réussit, on redirige vers une autre page
        this.$router.push('/home'); // Modifier l'URL de redirection si nécessaire
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
/* Ajoute ici tes styles personnalisés */
.text {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  background-color: #45a049;
}

label {
  display: block;
  margin-bottom: 5px;
}

p {
  color: red;
  font-size: 14px;
}
</style>
