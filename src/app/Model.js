import {Project} from "./Project";
import * as PubSub from "pubsub-js"

export class Model {
    constructor(){
       this.projects = [
        {
         id: 0,
         title: "Default",
         todos: []
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
      console.log(id + "it made it to Model!")
      let removed = this.projects.splice(id, 1);
      PubSub.publish("Changed Projects", {
          projects: this.projects
      })
    }
    editProjectTitle(){

    }
    addTodo(targetProject, data){
        console.log(targetProject, data)
    }


}