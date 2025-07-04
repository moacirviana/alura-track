import http from '@/http'
import type { Estado } from '@/store'
import type ITarefa from '@/interfaces/ITarefa'
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from '@/store/tipo-acoes'
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from '@/store/tipo-mutacoes'
import type { Module } from 'vuex'

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [DEFINIR_TAREFAS](state: EstadoTarefa, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONA_TAREFA](state: EstadoTarefa, tarefa: ITarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state: EstadoTarefa, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas').then((response) => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post('/tarefas', tarefa)
        .then((resposta) => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
    },
  },
}
