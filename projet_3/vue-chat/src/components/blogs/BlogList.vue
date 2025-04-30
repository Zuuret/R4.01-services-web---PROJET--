<template>
    <div>
      <div v-for="blog in blogArray" :key="blog._id" class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <span class="card-title">{{ blog.title }}</span>
            <p>{{ blog.content }}</p>
          </div>
          <div class="card-action">
            <router-link :to="`/blogs/${blog._id}`">Afficher</router-link>
            <button class="btn red white-text" @click="deleteOne(blog._id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  import { computed, onMounted } from 'vue';
  import { useBlogsStore } from '../../store';
  
  export default {
    name: 'BlogList',
    setup() {
      const store = useBlogsStore();
      onMounted(() => store.fetchBlogs());
      const blogArray = computed(() => Object.values(store.items));
      const deleteOne = id => store.deleteBlog(id);
      return { blogArray, deleteOne };
    }
  };
</script>
  