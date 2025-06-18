<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <router-link to="/projetos/novo" class="button is-primary">Novo Projeto</router-link>
    <table class="table is-striped is-fullwidth mt-5">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
          <th>menu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Projetos',

  setup() {
    const store = useStore()
    return { projetos: computed(() => store.state.projetos) }
  },
})
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>
