<template>
    <div class="signup">
      <h2>Inscription</h2>
      <form @submit.prevent="signup">
        <div>
          <label for="firstname">Prénom</label>
          <input type="text" id="firstname" v-model="firstname" required />
        </div>
        <div>
          <label for="lastname">Nom</label>
          <input type="text" id="lastname" v-model="lastname" required />
        </div>
        <div>
          <label for="emailid">Email</label>
          <input type="email" id="emailid" v-model="emailid" required />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
</template>
  
<script>
  import { signup } from '@/services/authService';
  
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        emailid: '',
        password: '',
      };
    },
    methods: {
      async signup() {
        try {
          const response = await signup({
            firstname: this.firstname,
            lastname: this.lastname,
            emailid: this.emailid,
            password: this.password,
          });
          alert(response.data.message);
          this.$router.push('/login'); // Rediriger vers login après inscription
        } catch (error) {
          alert('Erreur lors de l\'inscription');
        }
      },
    },
  };
</script>
  
<style scoped>
.signup {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

input {
  width: 95%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border 0.3s;
}

input:focus {
  border: 1px solid #42b983;
  outline: none;
}

button {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #2e8b57;
}
</style>
