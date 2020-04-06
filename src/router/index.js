import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login.vue';
import cadastro from '../views/cadastro.vue';
import painel from '../views/painel.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Acessar Controle Já',
    component: login
  },
  {
    path: '/cadastre-se',
    name: 'Controle Já | Cadastre - se',
    component: cadastro
  },
  {
    path: '/painel',
    name: 'Controle Já',
    component: painel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
