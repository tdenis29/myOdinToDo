import { Controller } from "./Controller"
import * as PubSub from "pubsub-js"

export class View {
    constructor(){
        this.projectForm = document.getElementById('addProject')
        this.appendProjects = document.getElementById('appendProjects')
        this.projectOverlay = document.getElementById("projectOverlay")
        this.appendTodos = document.getElementById('appendTodos')
        this.projectButtons = Array.from(document.getElementsByClassName("project-button"))
        //Update Projects List on change Add or Delete
        PubSub.subscribe("Changed Projects", (tag, projects) => {
            this.updateProjectsList(projects.projects)
        })
        //TODOS
        this.todoForm = document.getElementById('todoForm')
        this.selectedProject = document.getElementById('selectedProject')
    }
    updateProjectsList(arr){
        let projectArr = Array.from(arr)
        let projectHTML = "";
        projectArr.forEach((project, index) => {
            let title = project.title;
            if(!project.active){
            projectHTML += `
            <li id="${index}" class="project-button">
                ${title}
                <button class="deleteProject"><i id="${index}" class="fas fa-trash-alt"></i></button>
            </li>
        `
            } else {
                projectHTML += `
                <li id="${index}" class="project-button active">
                    ${title}
                    <button class="deleteProject"><i id="${index}" class="fas fa-trash-alt"></i></button>
                </li>
                `
            }
        });
        this.appendProjects.innerHTML = projectHTML;
    };
    /**
     * @param {none} param - returns data from add Project Form
    */
    projectSubmitData(){
        let projecttitle = document.getElementById('projectTitle').value
        return projecttitle;
    }
    /**
     * @param {Function} param - Connects this function (to add Projects to the Model Projects Arry) with Model via controller
    */
    bindAddProject(handler){
        this.projectForm.addEventListener('submit', e => {
            e.preventDefault()
            if(this.projectSubmitData()){
                handler(this.projectSubmitData())
                this.projectOverlay.style.display = "none";
            } else {
                console.log('No submit data')
            }
        } )
    }
    /**
     * @param {Function} param - Connects this function which deletes the specified project to the Model via the Controller
    */
    bindDeleteProject(handler){
     this.appendProjects.addEventListener('click', e => {
         if(e.target.nodeName == "I"){
             handler(e.target.id)
         } else {
             return 
         }
     })
    }
    /**
     * @param {Function} param - Connects this function which toggles the Active prop on the specified Project Object with the Model via the Controller
    */
    bindActiveProject(handler){
        this.appendProjects.addEventListener('click', e => {
            if(e.target.nodeName === "LI"){
               handler(e.target.id)
               this.styleActiveProject(e.target.id)
               PubSub.subscribe("Changed Active", (tag, active) => {
                  console.log(active)
               })
                // this.styleActiveProject(e.target.id);
            } else {
                return 
            }
        })
    }

    /**
     * @param {INT}} param - Takes the id of the Active project and styles it
    */
    styleActiveProject(id){
        parseInt(id)
        this.projectButtons = Array.from(document.getElementsByClassName("project-button")) 
        for(let i =0; i < this.projectButtons.length; i++){
            if(this.projectButtons[i].id === id){
                this.projectButtons[i].classList.add("active")
            } else if(this.projectButtons[i].id !== id ){
                this.projectButtons[i].classList.remove("active")
            } 
        }

    }
    displayActiveProjectsTodos(project){
        todoArr = project.title
        if(project.todos.length == 0){

        } else {
        todoArr.forEach((todo, index) => { 
            this.selectedProject.textContent = `${project.title}`
            const {id, title , dd, desc, pri} = todo
            let todoHTML = ''
            todoHTML += `
            <li id="${index}" class="todo">
                <div class="left-todo">
                    <button class="toggle-todo interface"><i class="far fa-circle"></i></button>
                     <p class="todo-title">${title}</p>
                </div> 
                <div class="right-todo">
                    <div class="input">
                        <input type="date" name="duedate" value="${dd}"> 
                    </div>
                    <button class="edit-todo interface"><i class="fas fa-edit"></i>Edit</button>
                    <button class="priority-todo interface"><i class="fas fa-hourglass-half"></i>Expand</button>
                    <button class="delete-todo interface"><i class="fas fa-trash-alt"></i>Delete</button>
                </div>
                <div id="${index}Collapsible" class="collapsible-content">
                    <p>${desc}</p>
                </div>
             </li>
             `
        })
    }
}
}