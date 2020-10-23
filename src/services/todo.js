import { http } from './config'

export default {
    listar: () => {
        return http.get('todo')
    },

    listarAtivos: () => {
        return http.get('todo/ativos');
    },
    listarCompletos: () => {
        return http.get('todo/completos');
    },

    salvar: (todo) => {
        return http.post('todo', todo)
    },

    atualizar: (id, tudo) => {
        return http.put('todo/atualizar/'+id, tudo)
    },

    deletar: (id) => {
        return http.delete('todo/deletar/'+id)
    },

    ativar: (id) => {
        return http.get('todo/ativo/'+id)
    }
}