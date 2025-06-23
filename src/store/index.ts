import type IProjeto from '@/interfaces/IProjeto'
import { createStore, Store, useStore as veuexUseStore } from 'vuex'
import type { InjectionKey } from 'vue'
import type { INotificacao } from '@/interfaces/INotificacao'

interface Estado {
  projetos: IProjeto[]
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
  state: {
    projetos: [],
    notificacoes: [],
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
})

export function useStore(): Store<Estado> {
  return veuexUseStore(key)
}
