import { Model } from "./Model";
import { View } from "./View";


export class Controller {
    constructor(){
        this.model = new Model()
        this.view = new View()
        //thisbindings
        //display intital project
        this.view.updateProjectsList(this.model.projects)
        //add projects linkup
        this.view.bindAddProject(this.handleAddProject)
        //delete projects linkup
        this.view.bindDeleteProject(this.handleDeleteProject)

    }
    handleAddProject = data => {
        this.model.addProject(data)
      }
    handleDeleteProject = data => {
        this.model.deleteProject(data)
    }




}