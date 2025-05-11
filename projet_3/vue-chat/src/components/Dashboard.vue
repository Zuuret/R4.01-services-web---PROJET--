<template>
    <div class="container">
      <!--
      <BlogList />
      <router-link to="/blogs/new" class="btn-floating btn-large red fixed-action-btn">
        <i class="large material-icons">add</i>
      </router-link>
      -->
    </div>
</template>
  
<script>
  import BlogList from './blogs/BlogList.vue';
  export default {
    name: 'Dashboard',
    components: { BlogList }
  };
</script>
  