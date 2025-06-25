<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjeto" class="label"> Nome do Projeto {{ nomeDoProjeto }}</label>
      <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes'

const props = defineProps<{
  id?: string
}>()

const store = useStore()
const { notificar } = useNotificador()
const router = useRouter()

const nomeDoProjeto = ref('')

onMounted(() => {
  if (props.id) {
    const projeto = store.state.projeto.projetos.find((proj) => proj.id === props.id)
    nomeDoProjeto.value = projeto?.nome || ''
  }
})

function mensagemSucesso() {
  nomeDoProjeto.value = ''
  notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', 'Projeto foi salvo com sucesso!')
  router.push('/projetos')
}

function salvar() {
  if (props.id) {
    store
      .dispatch(ALTERAR_PROJETO, {
        id: props.id,
        nome: nomeDoProjeto.value,
      })
      .then(() => mensagemSucesso())
  } else {
    store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value).then(() => mensagemSucesso())
  }
}
</script>
