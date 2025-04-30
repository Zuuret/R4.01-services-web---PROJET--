import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  actions: {
    async fetchUser() {
      const { data } = await axios.get('/api/current_user');
      this.user = data || false;
    }
  }
});

export const useBlogsStore = defineStore('blogs', {
  state: () => ({ items: {}, current: null }),
  actions: {
    async fetchBlogs() {
      const { data } = await axios.get('/api/blogs');
      this.items = data.reduce((acc, b) => ({ ...acc, [b._id]: b }), {});
    },
    async fetchBlog(id) {
      const { data } = await axios.get(`/api/blogs/${id}`);
      this.current = data;
    },
    async submitBlog(blog) {
      const { data } = await axios.post('/api/blogs', blog);
      this.items[data._id] = data;
    },
    async deleteBlog(id) {
      await axios.delete(`/api/blogs/${id}`);
      delete this.items[id];
    }
  }
});
