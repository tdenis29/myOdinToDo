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
        this.view.bindActiveProject(this.handleActiveProject)
        //add todo
        this.view.bindAddToDo(this.handleAddTodo)
        //delete todo
        this.view.bindDeleteTodo(this.handleDeleteTodo)
        this.view.bindEditTodo(this.handleEditTodo)
        this.view.bindMarkComplete(this.handleMarkComplete)
    }
    handleAddProject = data => {
        this.model.addProject(data)
      }
    handleDeleteProject = data => {
        this.model.deleteProject(data)
    }
    handleActiveProject = data => {
        this.model.toggleActivePropertyonProject(data)
    }
    handleAddTodo = (data)=> {
        this.model.addTodo(data)
    }
    handleDeleteTodo = data => {
        this.model.deleteTodo(data)
    }
    handleEditTodo = (data, id) => {
        this.model.editTodo(data, id)
    }
    handleMarkComplete = data => {
        this.model.markTodoComplete(data)
    }
}