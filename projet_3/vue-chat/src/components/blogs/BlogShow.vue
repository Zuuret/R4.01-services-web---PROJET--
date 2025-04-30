<template>
    <div class="container" v-if="blog">
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.content }}</p>
    </div>
  </template>
  
  <script>
  import { onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useBlogsStore } from '../../store';
  
  export default {
    name: 'BlogShow',
    setup() {
      const route = useRoute();
      const store = useBlogsStore();
      const id = route.params.id;
      onMounted(() => store.fetchBlog(id));
      const blog = computed(() => store.current);
      return { blog };
    }
  };
  </script>
  