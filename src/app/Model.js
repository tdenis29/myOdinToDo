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
         todos: [{id:0, title:"default"}],
         active: true
        }
       ]; 
       PubSub.subscribe('Loaded Projects', (tag, saved) => {
        this.projects = saved.saved
        PubSub.publish("Loaded Active", {
            active: this.findActiveProject()
        })
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
      PubSub.publish("Changed Projects", {
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
        PubSub.publish('Changed Active', {
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
        this.findActiveProject().todos.push(todo)
        PubSub.publish('Add Todo', {
            active: this.findActiveProject(),
        })
        this.saveProjectstoLocalStorage(this.projects)
    }
    deleteTodo(data){
        let id = parseInt(data.parentNode.parentNode.id)
        let active = this.findActiveProject()
        let removedTodo = active.todos.splice(id, 1)
        PubSub.publish('Delete Todo', {
            active: active
        })
        this.saveProjectstoLocalStorage(this.projects)

    }
 
    //Set Projects to Local Storage
    saveProjectstoLocalStorage(){
        this.localStorage.setItem("theProjects", JSON.stringify(this.projects))
    }

}