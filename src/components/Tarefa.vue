<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Box>
    <div class="columns">
      <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
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

defineProps<{
  tarefa: ITarefa
}>()
</script>

<style scoped>
.columns {
  margin-bottom: 0;
}
</style>
