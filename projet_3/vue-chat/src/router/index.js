import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../components/Landing.vue';
import Dashboard from '../components/Dashboard.vue';
import BlogForm from '../components/blogs/BlogForm.vue';
import BlogShow from '../components/blogs/BlogShow.vue';
import Chat from '../components/Chat.vue';

const routes = [
  { path: '/',      component: Landing },
  { path: '/blogs', component: Dashboard },
  { path: '/blogs/new', component: BlogForm },
  { path: '/blogs/:id', component: BlogShow, props: true },
  { path: '/chat',  component: Chat }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
