<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Box>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <CronoMetro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script setup lang="ts">
import CronoMetro from './CronoMetro.vue'
import Box from './Box.vue'
import type ITarefa from '../interfaces/ITarefa'

const props = defineProps<{
  tarefa: ITarefa
}>()

const emit = defineEmits<{
  (e: 'aoTarefaClicada', payload: ITarefa): void
}>()

function tarefaClicada() {
  emit('aoTarefaClicada', props.tarefa)
}
</script>

<style scoped>
.columns {
  margin-bottom: 0;
}
.clicavel {
  cursor: pointer;
}
</style>
