import Vue from 'vue';
import Router, { Route } from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/player/:partner/:collection/:identifier',
      name: 'player',
      component: () => import(/* webpackChunkName: "player" */ './views/Player.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const fromClass = from.name;
  const toClass = to.name;
  const bodyEl: HTMLCollectionOf<HTMLHtmlElement> = document.getElementsByTagName('html');
  if (bodyEl) {
    if (fromClass) {
      bodyEl[0].classList.remove(fromClass);
    }
    if (toClass) {
      bodyEl[0].classList.add(toClass);
    }
  }
  next();
});

export default router;
