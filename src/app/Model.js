import {Project} from "./Project";

export class Model {
    constructor(){
       this.projects = [];
          
    }
    addProject(data){
        let project = new Project(data);
        this.projects.push(project)
        console.log(this.projects)
    }
    deleteProject(title){
      this.projects = this.projects.filter(project => project.title.toLowerCase() === title.toLowerCase())
    }
    editProjectTitle(){

    }
    addTodo(targetProject, data){
        console.log(targetProject, data)
    }

}