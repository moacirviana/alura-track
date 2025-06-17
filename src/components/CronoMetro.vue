<template>
  <section class="display">
    <i class="far fa-clock"></i>

    {{ tempoDecorrido }}
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tempoEmSegundos?: number
}>()

const tempoDecorrido = computed(() => {
  // Converte os segundos em uma string no formato HH:MM:SS
  return new Date((props.tempoEmSegundos ?? 0) * 1000).toISOString().substr(11, 8)
})
</script>
<style scoped>
.diplay {
  color: var(--texto-primario);
}
</style>
