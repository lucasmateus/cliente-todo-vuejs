<template>
<div class="container">
  <h1 style="text-align: center">Registro de tarefas</h1>
  <form @submit.prevent="salvar">
    <input type="text" v-model="todo.descricao" placeholder="O que precisa ser feito?" required style="margin-left: auto; margin-right: auto; display: block; width: 70%">
  </form>
  <table class="table" style=" width: 70%; margin-left: auto; margin-right: auto; margin-top: 1%">
    <thead class="thead-dark">
      <tr>
        <th scope="col">Concluido</th>
        <th colspan="3">Nome</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="todo of todos" :key="todo.id">
        <th v-if="todo.ativo == true"><input type="checkbox" @click="ativar(todo.id)" checked></th>
        <th v-else><input type="checkbox" @click="ativar(todo.id)"></th>
        <th v-if="todo.ativo == true"><del>{{ todo.descricao }}</del></th>
        <th v-else>{{ todo.descricao }}</th>
        <th><b-button @click="getId(todo.id)" variant="secondary" v-b-modal.modal-1>Editar</b-button></th>
        <th><button @click="remover(todo.id)" type="button" class="btn btn-danger">Apagar</button></th>
      </tr>
    </tbody> 
    <tfoot>
      <tr class="table-dark">
        <th>{{todos.length}} Itens</th>
        <th colspan="3" >Listar: <a href="/">Todos</a> | <a href="#">Ativos</a> | <a href="#">Completos</a></th>
      </tr>
    </tfoot>
  </table>

  <div>
  <b-modal id="modal-1" title="Editar" hide-footer> 
    <b-form @submit.prevent="editar">
      <b-form-group  label="Nome:" label-for="input-1">
        <b-form-input id="input-1" v-model="todo_update.descricao" type="text" required/>
      </b-form-group>
      <b-button type="submit" variant="primary">Atualizar</b-button>
    </b-form>
  </b-modal>
</div>
</div>
</template>

<script>
import Todo from './services/todo'
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


export default{

  data(){
    return {
      idTodo: '',
      todo_update: {
        descricao: ''
      },
      todo: {
        descricao: ''
      },
      todos: []
    }
  },

  mounted(){
    this.listar()
  },
  methods:{
    listar(){
      Todo.listar().then(response =>{
        console.log('metodo listar')
        this.todos = response.data
      })
    },
    salvar(){
      Todo.salvar(this.todo).then(
        this.listar,
        this.todo = {},
      )
    },
    getId(id){
      this.idTodo = id
    },
    editar(){
      Todo.atualizar(this.idTodo, this.todo_update).then(
        this.listar,
        this.$bvModal.hide("modal-1"),
        this.todo_update = {}
      )
    },
    remover(id){
      Todo.deletar(id).then(
        this.listar
      )
    },
    ativar(id){
      Todo.ativar(id).then(
        this.listar
      )
    }
  }
}
</script>