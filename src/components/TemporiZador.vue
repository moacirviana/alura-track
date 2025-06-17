<template>
  <section class="is-flex is-align-items-center is-justify-content-space-between">
    <CronoMetro :tempoEmSegundos="tempoEmSegundos" />
    <button class="button" @click="iniciar" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar" :disabled="!cronometroRodando">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CronoMetro from './CronoMetro.vue'

const emit = defineEmits<{
  (e: 'aoFinalizarTarefa', tempo: number): void
}>()

const tempoEmSegundos = ref(0)
const cronometroRodando = ref(false)
let cronometro: number | undefined

function iniciar() {
  cronometroRodando.value = true
  cronometro = setInterval(() => {
    tempoEmSegundos.value += 1
  }, 1000)
}

function finalizar() {
  //
  emit('aoFinalizarTarefa', tempoEmSegundos.value)
  tempoEmSegundos.value = 0
  cronometroRodando.value = false
  if (cronometro) clearInterval(cronometro)
}
</script>
<style scoped>
.button {
  margin-left: 8px;
}
</style>
