import type IProjeto from '@/interfaces/IProjeto'
import { createStore, Store, useStore as veuexUseStore } from 'vuex'
import type { InjectionKey } from 'vue'

interface Estado {
  projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
  state: {
    projetos: [],
  },
  mutations: {
    ADICIONA_PROJETO(state: Estado, nomeProjeto: string) {
      state.projetos.push({
        id: new Date().toISOString(),
        nome: nomeProjeto,
      })
    },
  },
})

export function useStore(): Store<Estado> {
  return veuexUseStore(key)
}
