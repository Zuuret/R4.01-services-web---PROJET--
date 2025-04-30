<template>
  <div>
    <h2>Inscription</h2>
    <form @submit.prevent="signup">
      <label for="email">Adresse e-mail</label>
      <input v-model="email" class="text" name="email" type="email" placeholder="Email" required />

      <label for="firstname">Prénom</label>
      <input v-model="firstname" name="firstname" type="text" placeholder="Prénom" required />

      <label for="lastname">Nom de famille</label>
      <input v-model="lastname" name="lastname" type="text" placeholder="Nom de famille" required />

      <label for="password">Mot de passe</label>
      <input v-model="password" name="password" type="password" placeholder="Mot de passe" required />

      <button class="btn" type="submit">S'inscrire</button>
    </form>

    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      error: ''
    };
  },
  /* eslint-disable*/
  methods: {
    async signup() {
      try {
        // Envoi des données du formulaire vers l'API
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            password: this.password
          })
        });

        const data = await res.json();

        // Si l'inscription réussit, on redirige vers une autre page
        this.$router.push('/'); // Modifier l'URL de redirection si nécessaire
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
