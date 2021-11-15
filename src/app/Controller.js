import { Model } from "./Model";
import { View } from "./View";


export class Controller {
    constructor(){
        this.model = new Model()
        this.view = new View()
        //thisbindings
        this.view.bindAddProject(this.handleAddProject)
    }
    handleAddProject = data => {
        this.model.addProject(data)
      }
    watchChangesOnProjects(){
        
    }




}