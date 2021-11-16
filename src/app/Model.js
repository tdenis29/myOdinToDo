import {Project} from "./Project";
import * as PubSub from "pubsub-js"

export class Model {
    constructor(){
       this.projects = [
        {
         id: 0,
         title: "Default",
         todos: [],
         active: false
        }
       ]; 
    }
    addProject(data){
        let project = new Project(data, (this.projects.length));
        this.projects.push(project)
        console.log(project)
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
    addTodo(targetProject, data){
        console.log(targetProject, data)
    }
 
    toggleActivePropertyonProject(id){
        parseInt(id)
        for(let i = 0; i < this.projects.length; i++){
            if(this.projects[i].id == id && this.projects[i].active == false){
                this.projects[i].active = true  
            } else if(this.projects[i].id == id && this.projects[i].active === true){
                this.projects[i].active = false;
            }
            
        }
        console.log(this.projects)
    }
    findActiveProject(){

    }


}