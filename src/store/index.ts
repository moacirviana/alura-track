import { createStore, Store, useStore as veuexUseStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { INotificacao } from '@/interfaces/INotificacao'
import { projeto, type EstadoProjeto } from './modulos/projetos'
import { tarefa, type EstadoTarefa } from './modulos/tarefas'

export interface Estado {
  notificacoes: INotificacao[]
  projeto: EstadoProjeto
  tarefa: EstadoTarefa
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: [],
    },
    tarefa: {
      tarefas: [],
    },
  },
  mutations: {
    NOTIFICAR(state: Estado, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id,
        )
      }, 3000)
    },
  },
  modules: {
    projeto,
    tarefa,
  },
})

export function useStore(): Store<Estado> {
  return veuexUseStore(key)
}
