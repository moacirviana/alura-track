<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="digite para filtrar" v-model="filtro" />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>

    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />

    <Box v-if="tarefas.length === 0">
      <p class="has-text-centered">Você não está muito produtivo hoje</p>
    </Box>

    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando tarefa</p>
          <button class="delete" @click="fecharModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoTarefa" class="label"> Descrição da tarefa</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="buttons">
            <button @click="alterarTarefa" class="button is-success">Salvar</button>
            <button @click="fecharModal" class="button">Cancelar</button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import Tarefa from '@/components/Tarefa.vue'
import Box from '../components/Box.vue'
import Formulario from '@/components/FormularioCadTarefa.vue'
import type ITarefa from '@/interfaces/ITarefa'
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes'
import { useStore } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    Formulario,
    Tarefa,
    Box,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada).then(() => this.fecharModal())
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
    const filtro = ref('')
    const tarefas = computed(() =>
      store.state.tarefa.tarefas.filter((t) => !filtro.value || t.descricao.includes(filtro.value)),
    )

    return {
      tarefas,
      store,
      filtro,
    }
  },
})
</script>

<style></style>
