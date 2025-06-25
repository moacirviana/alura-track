import http from '@/http'
import type IProjeto from '@/interfaces/IProjeto'
import type { Estado } from '@/store'
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETO,
  ALTERAR_PROJETO,
  REMOVER_PROJETO,
} from '@/store/tipo-acoes'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  DEFINIR_PROJETOS,
} from '@/store/tipo-mutacoes'
import type { Module } from 'vuex'

export interface EstadoProjeto {
  projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADICIONA_PROJETO](state: EstadoProjeto, nomeProjeto: string) {
      state.projetos.push({
        id: new Date().toISOString(),
        nome: nomeProjeto,
      })
    },
    [ALTERA_PROJETO](state: EstadoProjeto, projeto: IProjeto) {
      const index = state.projetos.findIndex((p) => p.id === projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state: EstadoProjeto, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id)
    },
    [DEFINIR_PROJETOS](state: EstadoProjeto, projetos: IProjeto[]) {
      state.projetos = projetos
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos').then((resposta) => commit(DEFINIR_PROJETOS, resposta.data))
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post('/projetos', {
        nome: nomeDoProjeto,
      })
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http.delete(`/projetos/${id}`).then(() => commit(EXCLUIR_PROJETO, id))
    },
  },
}
