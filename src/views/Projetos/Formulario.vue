<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjeto" class="label"> Nome do Projeto</label>
      <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjet" />
    </div>
    <div class="field">
      <button class="button" type="submit">Salvar</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
// import { notificacaoMixin } from '@/mixins/notificar'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Projetos',
  props: {
    id: {
      type: String,
    },
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((proj) => proj.id === this.id)
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  // mixins: [notificacaoMixin],
  data() {
    return {
      nomeDoProjeto: '',
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store
          .dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto,
          })
          .then(() => this.mensagemSucesso())
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
          .then(() => this.mensagemSucesso())
      }
    },
    mensagemSucesso() {
      this.nomeDoProjeto = ''
      this.notificar(TipoNotificacao.SUCESSO, 'Projeto salvo', 'Projeto foi salvo com sucesso!')
      this.$router.push('/projetos')
    },
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return { store, notificar }
  },
})
</script>

<style scoped></style>
