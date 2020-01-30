import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: '/media',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/player/:identifier',
      name: 'player',
      component: () => import(/* webpackChunkName: "player" */ './views/Player.vue'),
    },
  ],
});
