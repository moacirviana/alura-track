import type IProjeto from '@/interfaces/IProjeto'
import { createStore, Store, useStore as veuexUseStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { INotificacao } from '@/interfaces/INotificacao'
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from './tipo-acoes'
import http from '@/http'
import {
  ADICIONA_TAREFA,
  ALTERA_TAREFA,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
} from './tipo-mutacoes'
import type ITarefa from '@/interfaces/ITarefa'
import { transform } from 'typescript'

interface Estado {
  projetos: IProjeto[]
  notificacoes: INotificacao[]
  tarefas: ITarefa[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
  },
  mutations: {
    ADICIONA_PROJETO(state: Estado, nomeProjeto: string) {
      state.projetos.push({
        id: new Date().toISOString(),
        nome: nomeProjeto,
      })
    },
    ALTERA_PROJETO(state: Estado, projeto: IProjeto) {
      const index = state.projetos.findIndex((p) => p.id === projeto.id)
      state.projetos[index] = projeto
    },
    EXCLUIR_PROJETO(state: Estado, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id)
    },
    DEFINIR_PROJETOS(state: Estado, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    NOTIFICAR(state: Estado, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id,
        )
      }, 3000)
    },
    DEFINIR_TAREFAS(state: Estado, tarefas: ITarefa[]) {
      state.tarefas = tarefas
    },
    ADICIONA_TAREFA(state: Estado, tarefa: ITarefa) {
      console.log('cheguei aqui')
      state.tarefas.push(tarefa)
    },
    ALTERA_TAREFA(state: Estado, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((p) => p.id === tarefa.id)
      state.tarefas[index] = tarefa
    },
  },
  actions: {
    OBTER_PROJETOS({ commit }) {
      http.get('projetos').then((resposta) => commit(DEFINIR_PROJETOS, resposta.data))
    },
    CADASTRAR_PROJETO(contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto,
      })
    },
    ALTERAR_PROJETO(contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    REMOVER_PROJETO({ commit }, id: string) {
      return http.delete(`/projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id))
    },
    OBTER_TAREFAS({ commit }) {
      http.get('tarefas').then((resposta) => commit(DEFINIR_TAREFAS, resposta.data))
    },
    CADASTRAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http
        .post('/tarefas', tarefa)
        .then((resposta) => commit(ADICIONA_TAREFA, resposta.data))
    },
    ALTERAR_TAREFA({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERAR_TAREFA, tarefa))
    },
  },
})

export function useStore(): Store<Estado> {
  return veuexUseStore(key)
}
