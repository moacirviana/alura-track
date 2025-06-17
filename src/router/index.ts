import { createRouter, createWebHistory } from 'vue-router'
import Tarefas from '@/views/Tarefas.vue'
import Projetos from '@/views/Projetos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Tarefas,
    },
    {
      path: '/projetos',
      name: 'projetos',
      component: Projetos,
    },
  ],
})

export default router
