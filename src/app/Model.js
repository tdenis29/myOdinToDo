import {Project} from "./Project";
import * as PubSub from "pubsub-js"
import { Todo } from "./Todo";

export class Model {
    constructor(){
       this.projects = [
        {
         id: 0,
         title: "Default",
         todos: [],
         active: true
        }
       ]; 
    }
    addProject(data){
        let project = new Project(data, (this.projects.length));
        this.projects.push(project)
      
        PubSub.publish("Changed Projects", {
            projects: this.projects,
        })
    }
    deleteProject(id){
      parseInt(id)
      let removed = this.projects.splice(id, 1);
      PubSub.publish("Changed Projects", {
          projects: this.projects
      })
    }
    addTodo(data){
        let todo = new Todo(this.findActiveProject().todos.length, data.todoTitle, data.todoDesc, data.todoPri, data.tododd) 
        this.findActiveProject().todos.push(todo)
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
        PubSub.publish("Changed Active", {
            active: this.findActiveProject()
        })
    }
    findActiveProject(){
        return this.projects.find(project => project.active);
    }


}