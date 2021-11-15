import { Controller } from "./Controller"
export class View {
    constructor(){
        this.projectForm = document.getElementById('addProject')
        this.projectButtons = Array.from(document.getElementsByClassName("project-button")) 
    }
    displayProject(arr){
    console.log(arr)
    }
  
    projectSubmitData(){
        let projecttitle = document.getElementById('projectTitle').value
        return projecttitle;
    }
    bindAddProject(handler){
        this.projectForm.addEventListener('submit', e => {
            e.preventDefault()
            if(this.projectSubmitData()){
                handler(this.projectSubmitData())
            } else {
                console.log('No submit data')
            }
        } )
    }
  
    
    
}