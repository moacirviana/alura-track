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
import { defineComponent } from 'vue'

import Formulario from '@/components/FormularioCadTarefa.vue'
import Tarefa from '@/components/Tarefa.vue'
import type ITarefa from '@/interfaces/ITarefa'
import Box from '@/components/Box.vue'

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefas: [] as ITarefa[],
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    },
  },
})
</script>

<style></style>
