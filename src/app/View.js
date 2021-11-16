import { Controller } from "./Controller"
import * as PubSub from "pubsub-js"

export class View {
    constructor(){
        this.projectForm = document.getElementById('addProject')
        this.projectButtons = Array.from(document.getElementsByClassName("project-button")) 
        this.appendProjects = document.getElementById('appendProjects')
        this.projectOverlay = document.getElementById("projectOverlay")

        //Update Projects List on change Add or Delete
        PubSub.subscribe("Changed Projects", (tag, projects) => {
            this.updateProjectsList(projects.projects)
        })
        //TODOS
        this.todoForm = document.getElementById('todoForm')
    }
    updateProjectsList(arr){
        console.log(arr)
        let projectArr = Array.from(arr)
        let projectHTML = "";
        projectArr.forEach((project, index) => {
            let title = project.title;
            projectHTML += `
            <li id="${index}" class="project-button" >
                ${title}
                <button class="deleteProject"><i id="${index}" class="fas fa-trash-alt"></i></button>
            </li>
        `
        });
        this.appendProjects.innerHTML = projectHTML;
    };
    projectSubmitData(){
        let projecttitle = document.getElementById('projectTitle').value
        return projecttitle;
    }
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
    bindDeleteProject(handler){
     this.appendProjects.addEventListener('click', e => {
         if(e.target.nodeName == "I"){
             handler(e.target.id)
         } else {
             return 
         }
     })
    }
    bindActiveProject(handler){
        this.appendProjects.addEventListener('click', e => {
            if(e.target.nodeName === "LI"){
               e.target.classList.toggle("active")
               handler(e.target.id)
            } else {
                return 
            }
        })
    }

}