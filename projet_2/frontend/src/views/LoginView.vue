<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="login">
      <div>
        <label for="emailId">Email</label>
        <input type="email" id="emailId" v-model="emailId" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { login } from "@/services/authService";

export default {
  data() {
    return {
      emailId: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await login({
          emailId: this.emailId,
          password: this.password,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        this.$router.push("/dashboard");
      } catch (error) {
        alert("Identifiants incorrects");
      }
    },
  },
};
</script>

<style scoped>
.login {
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
