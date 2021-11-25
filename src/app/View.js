import { Controller } from "./Controller"
import * as PubSub from "pubsub-js"

export class View {
    constructor(){
        this.body = document.getElementById('body')
        this.projectForm = document.getElementById('addProject')
        this.appendProjects = document.getElementById('appendProjects')
        this.projectOverlay = document.getElementById("projectOverlay")
        this.appendTodos = document.getElementById('appendTodos')
        this.projectButtons = Array.from(document.getElementsByClassName("project-button"))
        // Update Projects List on change Add or Delete
        PubSub.subscribe("Changed Projects", (tag, projects) => {
            this.updateProjectsList(projects.projects)
        })
        //TODOS
        this.todoForm = document.getElementById('todoForm')
        this.todoOverlay = document.getElementById('todoOverlay')
        this.selectedProject = document.getElementById('selectedProject')
        this.todoEditOverlay = document.getElementById('todoEditOverlay')
        this.todoEditForm = document.getElementById('todoEditForm')
        //Update Todos list on add
        const Addtoken = PubSub.subscribe('Add Todo', this.displayActiveProjectsTodos.bind(this));
        //Update Todos List on load 
        const LoadToken = PubSub.subscribe('Loaded Active', this.displayActiveProjectsTodos.bind(this))
        // Update todos List on Delete
        const deleteToken = PubSub.subscribe("Delete Todo", this.displayActiveProjectsTodos.bind(this))
        // Update todos List on Edit
        const editToken = PubSub.subscribe("Edit Todo", this.displayActiveProjectsTodos.bind(this))
  
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
    todoSubmitData(){
        let todoTitle = document.getElementById("todoTitle").value
        let todoDesc = document.getElementById("todoDesc").value
        let todoPri = document.getElementById('todoPri').value
        let tododd = document.getElementById('tododd').value
        return {todoTitle, todoDesc, todoPri, tododd}
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
                this.projectForm.reset()
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
         if(e.target.nodeName === "I"){
             handler(e.target.id)
             this.appendTodos.innerHTML = "";
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
            if(e.target.classList.contains("project-button")){
               handler(e.target.id)
               this.styleActiveProject(e.target.id)
            } else {
                return 
            }
        } )
        const token = PubSub.subscribe('Changed Active', this.displayActiveProjectsTodos.bind(this));
    }
    //if update is null we will just add however if update is !== null we will update
    bindAddToDo(handler, update = null, id = null){
        this.todoForm.addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            if(this.todoSubmitData() && update === null){
                handler(this.todoSubmitData(), update)
                this.todoOverlay.style.display = "none";
                this.todoForm.reset()
            } else if (update !== null && id !== null){

            }
        })
    }
    bindDeleteTodo(handler){
        this.appendTodos.addEventListener('click', e => {
            if(e.target.classList.contains('fa-trash-alt')){
                handler(e.target)
            }
        })
    }

    bindExpandTodo(){
        this.appendTodos.addEventListener('click', e => {
            if(e.target.classList.contains('fa-expand-arrows-alt')){
                let selectedTodo = e.target.parentNode.parentNode.id
                let todos = document.getElementsByClassName('todo')
                let todosArr  = Array.from(todos)
                for(let i = 0; i < todosArr.length; i++){
                    if(todosArr[i].id === selectedTodo){
                        todosArr[i].lastChild.previousSibling.classList.toggle('expand')
                    }
                }
            }
        })
    }

    todoEditSubmitData(){
        let todoTitle = document.getElementById("todoEditTitle").value
        let todoDesc = document.getElementById("todoEditDesc").value
        let todoPri = document.getElementById('todoEditPri').value
        let tododd = document.getElementById('todoEditdd').value
        return {todoTitle, todoDesc, todoPri, tododd}
    }

    bindEditTodo(handler){
        this.appendTodos.addEventListener('click', e => {
            let thisHandler = handler
            if(e.target.classList.contains('fa-edit')){
                let selectedTodo = e.target.parentNode.parentNode.id
                let thatHandler = thisHandler
                this.todoEditOverlay.style.display = 'block';
                PubSub.publish("Request Edit", {
                    selected: selectedTodo
                })
                const editToken = PubSub.subscribe('Give To Edit', (tag, todo) => {
                    this.fillFormForEdit(todo)
                })
                this.todoEditForm.addEventListener('submit', e => {
                    let myHandler = thatHandler
                    e.preventDefault()
                    e.stopPropagation()
                    myHandler(this.todoEditSubmitData(), selectedTodo)
                    this.todoEditOverlay.style.display = "none";
                    this.todoEditForm.reset()
                })
          
            }
       
        })
    }

    fillFormForEdit(obj){
        
        document.getElementById('todoTitle').value = obj.todo.title
       
        document.getElementById('todoDesc').value = obj.todo.desc
        
        document.getElementById('todoPri').value = obj.todo.pri
      
        document.getElementById('tododd').value = obj.todo.dd
    }
    /**
     * @param {INT}} param - Takes the id of the Active project and styles it
    */
    styleActiveProject(id){
        parseInt(id)
        this.projectButtons = Array.from(document.getElementsByClassName("project-button"))
        if(this.projectButtons.length === 1){
            this.projectButtons[0].classList.add("active")
        } else {
        for(let i =0; i < this.projectButtons.length; i++){
            if(this.projectButtons[i].id === id){
                this.projectButtons[i].classList.add("active")
            } else if(this.projectButtons[i].id !== id ){
                this.projectButtons[i].classList.remove("active")
            } 
        }
    }
}
    displayActiveProjectsTodos = function (msg, active){
        console.log(active + " View190")
        let project = active.active
        if(project === undefined || project === null){
            return 
        } else {
        let title = project.title;
        let todoArr = project.todos;
        let todoHTML = '';
        this.selectedProject.textContent = `${title}`;
        if(todoArr.length === 0){
            let emptyTodoMessage = `No Todos in this Project, Create One.`
            this.appendTodos.textContent = emptyTodoMessage
        } else {
        todoArr.forEach((todo, index) => { 
            const {id, title , dd, desc, pri} = todo
            todoHTML += `
            `;if(pri === "High"){
              todoHTML += `<li id="${index}" class="todo high">`
            } else if (pri === "Medium"){
                todoHTML += `<li id="${index}" class="todo medium">`
            } else {
                todoHTML += `<li id="${index}" class="todo low">`
            }
            todoHTML += `
                <div class="left-todo">
                    <button class="toggle-todo interface"><i class="far fa-circle"></i></button>
                     <p class="todo-title">${title}</p>
                </div> 
                <div class="right-todo">
                `;if(dd === "" || dd === undefined){
                    todoHTML += `
                    <div class="input">
                        <p>No Dude Date!</p>
                    </div>`
                } else if (dd !== ""){
                    todoHTML += `
                    <div class="input">
                        <input type="date" readonly name="duedate" value="${dd}"> 
                    </div>
                    `
                }
                todoHTML += `
                        <i class="fas fa-edit"></i>Edit</button>
                        <i class="fas fa-trash-alt"></i>Delete</button>
                        <i class="fas fa-expand-arrows-alt"></i>
                </div>
                `; if(desc === "" || desc === undefined){
                    todoHTML += `
                    <div id="todoDesc" class="todoDesc">
                        <p class="desc">No Description For This Todo.</p>
                   </div> 
                    `
                } else {
                    todoHTML += `
                    <div id="todoDesc" class="todoDesc">
                        <p class="desc">${desc}</p>
                    </div> 
                </li>
                    `
                }
        })
        this.appendTodos.innerHTML = todoHTML;
       
        }
    }
}

  loadProjects(){
      window.addEventListener('load', e => {
        if(window.localStorage.getItem('theProjects') === null){
            return 
        } else {
            let savedProjects = JSON.parse(window.localStorage.getItem('theProjects') || [] ) 
            this.updateProjectsList(savedProjects)
            PubSub.publish('Loaded Projects', {
                 saved: savedProjects
            })
       
        }
      })
  }
   
}



// const mySubscriber = function (msg, data) {
//     console.log( msg, data );
// };

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
// var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// publish a topic asynchronously
// PubSub.publish('MY TOPIC', 'hello world!');

// publish a topic synchronously, which is faster in some environments,
// but will get confusing when one topic triggers new topics in the
// same execution chain
// USE WITH CAUTION, HERE BE DRAGONS!!!
// PubSub.publishSync('MY TOPIC', 'hello world!');