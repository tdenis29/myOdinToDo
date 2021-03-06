import {Project} from "./Project";
import * as PubSub from "pubsub-js"
import { Todo } from "./Todo";

export class Model {
    constructor(){
       this.localStorage = window.localStorage
       this.projects = [
        {
         id: 0,
         title: "Default",
         todos: [],
         active: true
        }
       ]; 
       const loadToken = PubSub.subscribe('Loaded Projects', (tag, saved) => {
        this.projects = saved.saved
        PubSub.publishSync("Loaded Active", {
            active: this.findActiveProject()
        })
    })
    const editTakeToken = PubSub.subscribe('Request Edit', (tag, selected) => {
        let active = this.findActiveProject()
        for(let i = 0; i < active.todos.length; i++){
            if(active.todos[i].id === parseInt(selected.selected)){
                PubSub.publishSync("Give To Edit", {
                    todo : active.todos[i]
                })
            }
        }
    })
 }
    // PROJECT METHODS
    addProject(data){
        let project = new Project(data, (this.projects.length));
        this.projects.push(project)
        PubSub.publishSync("Changed Projects", {
            projects: this.projects,
        })
        this.saveProjectstoLocalStorage(this.projects)

    }
    deleteProject(id){
      parseInt(id)
      let removed = this.projects.splice(id, 1);
      PubSub.publishSync("Changed Projects", {
          projects: this.projects
      })
      this.saveProjectstoLocalStorage(this.projects)
    }

    toggleActivePropertyonProject(id){
        parseInt(id)
        for(let i = 0; i < this.projects.length; i++){
            if(this.projects[i].id == id ){
                this.projects[i].active = true;
            } else if (this.projects[i].id !== id ){
                this.projects[i].active = false
            } 
        }
        PubSub.publishSync('Changed Active', {
            active: this.findActiveProject()
        });
        this.saveProjectstoLocalStorage(this.projects)  
     
    }

    findActiveProject(){
        return this.projects.find(project => project.active);
    }

    // TODOS METHODS
    addTodo(data){
        let todo = new Todo(this.findActiveProject().todos.length, data.todoTitle, data.todoDesc, data.todoPri, data.tododd)
        let active = this.findActiveProject() 
        active.todos.push(todo)
        this.updateTodoId(active.todos)
        PubSub.publishSync('Add Todo', {
            active: this.findActiveProject(),
        })
        this.saveProjectstoLocalStorage(this.projects)
    
    }

    deleteTodo(data){
        let id = parseInt(data.parentNode.parentNode.id)
        let active = this.findActiveProject()
        let removedTodo = active.todos.splice(id, 1)
        this.updateTodoId(active.todos)
        PubSub.publishSync('Delete Todo', {
            active: active
        })
        
        this.saveProjectstoLocalStorage(this.projects)

    }
 
    editTodo(data, id){
      let active = this.findActiveProject()
      let numId = parseInt(id)
    //   console.log(numId)
      for(let j = 0; j < active.todos.length; j++){
          if(active.todos[j].id === numId ){
              active.todos[j].title = data.todoTitle
              active.todos[j].desc = data.todoDesc
              active.todos[j].dd = data.tododd
              active.todos[j].pri = data.todoPri
            //   console.log(active.todos[j])
              PubSub.publishSync("Edit Todo", {
                  active: active
              })
              
          } 
      }
      this.saveProjectstoLocalStorage(this.projects)
    }

    markTodoComplete(id){
        let active = this.findActiveProject()
        for(let i = 0; i < active.todos.length; i++){
            if(active.todos[i].id === parseInt(id) ){
                active.todos[i].complete = true;
                // PubSub.publish('Mark Complete', {
                //     active: this.findActiveProject()
                // })
            }
         
        }
   
   
    }
    updateTodoId(array){
       array.forEach((item,index) => {
            item.id = index
        })
    }
    //Set Projects to Local Storage
    saveProjectstoLocalStorage(){
        this.localStorage.setItem("theProjects", JSON.stringify(this.projects))
    }

}