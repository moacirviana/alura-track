<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    <Box v-if="tarefas.length === 0">
      <p class="has-text-centered">Você não está muito produtivo hoje</p>
    </Box>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import Tarefa from '@/components/Tarefa.vue'
import Box from '../components/Box.vue'
import Formulario from '@/components/FormularioCadTarefa.vue'
import type ITarefa from '@/interfaces/ITarefa'
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },

  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length == 0
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    }
  },
})
</script>

<style></style>
