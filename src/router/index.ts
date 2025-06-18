import { createRouter, createWebHistory } from 'vue-router'
import Tarefas from '@/views/Tarefas.vue'
import Projetos from '@/views/Projetos.vue'
import Formulario from '@/views/Projetos/Formulario.vue'

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
    {
      path: '/projetos/novo',
      name: 'Novo projeto',
      component: Formulario,
    },
    {
      path: '/projetos/:id',
      name: 'Editar projeto',
      component: Formulario,
      props: true, // Pass the route params as props to the component
    },
  ],
})

export default router
