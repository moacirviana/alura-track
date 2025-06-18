import type IProjeto from '@/interfaces/IProjeto'
import { createStore, Store } from 'vuex'
import type { InjectionKey } from 'vue'

interface Estado {
  projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store: Store<Estado> = createStore<Estado>({
  state: {
    projetos: [
      {
        id: new Date().toISOString(),
        nome: 'Typescript',
      },
      {
        id: new Date().toISOString(),
        nome: 'VueJS',
      },
      {
        id: new Date().toISOString(),
        nome: 'SpringBoot',
      },
    ],
  },
})
