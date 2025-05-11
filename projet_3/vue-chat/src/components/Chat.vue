<template>
    <div>
      <h3>Chat en temps réel</h3>
      <div class="messages">
        <div v-for="msg in messages" :key="msg._id">
          <strong>{{ msg.user }}:</strong> {{ msg.text }}
        </div>
      </div>
      <input v-model="text" @keyup.enter="send" placeholder="Tapez un message…" />
      <button @click="send">Envoyer</button>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import socket from '../services/socket';
  import { useAuthStore } from '../store';


  const auth = useAuthStore();
  const messages = ref([]);
  const text = ref('');

  onMounted(() => {
    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.IO');
    });

    socket.on('receiveMessage', msg => {
      console.log('Message reçu du serveur :', msg);
      messages.value.push(msg);
    });

    socket.on('connect_error', (err) => {
      console.error('Erreur de connexion socket :', err.message);
    });
  });

  function send() {
    if (!text.value) return;

    if (!auth.user || !auth.user._id) {
      console.warn('Utilisateur non connecté, message non envoyé');
      return;
    }

    socket.emit('sendMessage', {
      text: text.value,
      userId: auth.user._id
    });

    console.log('Message envoyé :', text.value);
    text.value = '';
  }
</script>

<style>
  .messages { max-height: 300px; overflow-y: auto; }
</style>
