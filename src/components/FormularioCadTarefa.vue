<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>

      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="column">
        <TemporiZador @aoFinalizarTarefa="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import TemporiZador from './TemporiZador.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import { store } from '@/store'
import { TipoNotificacao } from '@/interfaces/INotificacao'
import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
  name: 'FormularioCadTarefa',
  emits: ['aoSalvarTarefa'],
  components: {
    TemporiZador,
  },
  data() {
    return {
      descricao: '',
      idProjeto: '',
      store,
    }
  },
  mixins: [notificacaoMixin],
  methods: {
    salvarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((proj: { id: string }) => proj.id === this.idProjeto)
      if (!projeto) {
        this.notificar(
          TipoNotificacao.FALHA,
          'Ops!',
          'Selecione um projeto antes de finalizar a tarefa!',
        )
        return
      }
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: projeto,
      })
      this.descricao = ''
    },
  },
  setup() {
    const store = useStore(key)
    return {
      projetos: computed(() => store.state.projetos),
    }
  },
})
</script>
<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
