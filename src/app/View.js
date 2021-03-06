
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
        this.emptyTodoMessage = document.getElementById('emptyTodo')
        this.todoEditOverlay = document.getElementById('todoEditOverlay')
        this.todoEditForm = document.getElementById('todoEditForm')
        //Update Todos list on add
        const Addtoken = PubSub.subscribe('Add Todo', this.displayActiveProjectsTodos.bind(this));
        //Update Todos List on load 
        const LoadToken = PubSub.subscribe('Loaded Active', this.displayActiveProjectsTodos.bind(this))
        // Update todos List on Delete
        const deleteToken = PubSub.subscribe("Delete Todo", this.displayActiveProjectsTodos.bind(this))
        // Update todos List on Edit
        // const editToken = PubSub.subscribe("Edit Todo", this.displayActiveProjectsTodos.bind(this))
        // const completeToken = PubSub.subscribe("Mark Complete", this.displayActiveProjectsTodos.bind(this))
  
    }
     /**
     * @param {Function} param - Render Function for the Projects section to show new projects as they are added or deleted using PubSub Data on line 13 View.js
    */
    updateProjectsList(arr){
        let projectArr = Array.from(arr)
        let projectHTML = "";
        projectArr.forEach((project, index) => {
            let title = project.title;
            if(!project.active){
            projectHTML += `
            <div id="${index}" class="project-button">
                <li>
                    ${title}
                </li>
            
                <div>
                 <button class="deleteProject"><i id="${index}" class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `
            } else {
                projectHTML += `
            <div id="${index}" class="project-button active">
                <li>
                    ${title}
                </li>
                <div>
                 <button class="deleteProject"><i id="${index}" class="fas fa-trash-alt"></i></button>
                </div>
            </div>
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
     * @param {none} param - returns data from add todo Form
    */
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
               
            }
        } )
    }
    /**
     * @param {Function} param - Connects this function which deletes the specified project to the Model via the Controller
    */
    bindDeleteProject(handler){
     this.appendProjects.addEventListener('click', e => {
         e.stopPropagation()
         if(e.target.nodeName === "I"){
             let result = confirm("Delete This Project?")
             if(result){
             handler(e.target.id)
             this.appendTodos.innerHTML = "";
             }
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
            e.stopPropagation()
            if(e.target.classList.contains("project-button")){
               handler(e.target.id)
               this.styleActiveProject(e.target.id)
            } else {
                return 
            }
        } )
        const token = PubSub.subscribe('Changed Active', this.displayActiveProjectsTodos.bind(this));
    }
    /**
     * @param {Function} param - Connects this function which adds a new Todo with the Model via the Controller
    */
    bindAddToDo(handler){
        this.todoForm.addEventListener('submit', e => {
            e.preventDefault()
            e.stopPropagation()
            if(this.todoSubmitData()){
                handler(this.todoSubmitData())
                this.todoOverlay.style.display = "none";
                this.todoForm.reset()
            } 
        })
    }
    bindDeleteTodo(handler){
        this.appendTodos.addEventListener('click', e => {
            e.stopPropagation()
            if(e.target.classList.contains('fa-trash-alt')){
                handler(e.target)
            }
        })
    }

    bindExpandTodo(){
        this.appendTodos.addEventListener('click', e => {
            e.stopPropagation()
            if(e.target.classList.contains('fa-expand-arrows-alt')){
                let selectedTodo = e.target.parentNode.parentNode.id
                console.log(e.target.parentNode.parentNode.id)
                let todos = document.getElementsByClassName('todo')
                let todosArr  = Array.from(todos)
                for(let i = 0; i < todosArr.length; i++){
                    if(todosArr[i].id === selectedTodo){
                        // console.log(todosArr[i].lastChild.previousSibling.nextSibling)
                        todosArr[i].lastChild.previousSibling.nextSibling.classList.toggle('expand')
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
    // So step one is 

    bindEditTodo(handler){
        let selectedTodo = null;
        this.appendTodos.addEventListener('click', e => {
            e.stopPropagation()
            const editToken = PubSub.subscribe("Edit Todo", this.displayActiveProjectsTodos.bind(this))
            if(e.target.classList.contains('fa-edit')){
                selectedTodo = e.target.parentNode.parentNode.id
                console.log(e.target.parentNode.parentNode.id)
                this.todoEditOverlay.style.display = 'block';

                PubSub.publishSync("Request Edit", {
                    selected: selectedTodo
                    
                })
                const editTakeToken = PubSub.subscribe('Give To Edit', (tag, todo) => {
                    this.fillFormForEdit(todo)
                    
                })
               
               
                this.todoEditForm.addEventListener('submit', e => {
                    e.stopImmediatePropagation()
                    e.preventDefault();
                    handler(this.todoEditSubmitData(), selectedTodo)
                    this.todoEditOverlay.style.display = "none";
                    this.todoEditForm.reset()
                    PubSub.unsubscribe(editTakeToken) 
                   PubSub.unsubscribe(editToken)
                    
                   
                })
            
          
            }
       
        })
    }
    /**
     * @param {OBJ} param - Fills form with data received from PubSub if only one item needs to be changed on Edit Todo
    */
    fillFormForEdit(obj){

       
        document.getElementById('todoEditTitle').value = obj.todo.title
       
        document.getElementById('todoEditDesc').value = obj.todo.desc
        
        document.getElementById('todoEditPri').value = obj.todo.pri
      
        document.getElementById('todoEditdd').value = obj.todo.dd
    }

    bindMarkComplete(handler){
        this.appendTodos.addEventListener('click', e => {
            if(e.target.classList.contains('fa-circle')){
                let selectedTodo = e.target.parentNode.parentNode.parentNode.id
                handler(selectedTodo)
                this.visuallyMarkComplete(selectedTodo)
            }
        })
    }

    visuallyMarkComplete(selectedTodo){
        let todos = document.getElementsByClassName('todo')
        let todosArr  = Array.from(todos)
        for(let i = 0; i < todosArr.length; i++){
            if(todosArr[i].id === selectedTodo){
                todosArr[i].classList.toggle('complete')
            }
        }
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
        let project = active.active
        if(project === undefined || project === null){
            return 
        } else {
        let title = project.title;
        let todoArr = project.todos;
        let todoHTML = '';
        this.selectedProject.textContent = `${title}`;
        if(todoArr.length === 0){
            this.emptyTodoMessage.textContent = `No Todos in this Project... Create One!`
            this.appendTodos.innerHTML = "";
        } else {
        todoArr.forEach((todo, index) => { 
            this.emptyTodoMessage.textContent = "";
            const {id, title , dd, desc, pri, complete} = todo
            todoHTML += `
            `;if(pri === "High"){
              todoHTML += `<li id="${index}" class="todo high">`
            } else if (pri === "Medium") {
                todoHTML += `<li id="${index}" class="todo medium">`
            } else if (pri === "Low"){
                todoHTML += `<li id="${index}" class="todo low">`
            }
            todoHTML += `
                <div class="left-todo">
                    <button class="toggle-todo interface"><i class="fas fa-circle"></i></button>
                     <p class="todo-title">${title}</p>
                </div> 
                <div class="right-todo">
                 `;
                todoHTML += `
                        <i class="fas fa-edit"></i></button>
                        <i class="fas fa-trash-alt"></i></button>
                        <i class="fas fa-expand-arrows-alt"></i>
                </div>
                `; if(desc === "" || desc === undefined){
                    todoHTML += `
                    <div id="todoDesc" class="todoDesc">
                        <p class="desc">No Description For This Todo.</p>
                     `;if(dd === "" || dd === undefined){
                        todoHTML += `
                        <div class="input desc">
                            <p>No Dude Date!</p>
                            <input class="hide" type="date" readonly name="duedate"> 
                        </div>
                        </div>`
                     } 
                } else {
                    todoHTML += `
                    <div id="todoDesc" class="todoDesc">
                        <p class="desc">${desc}</p>
                        <div class="input desc">
                            <p> This is due on: </p>
                            <input type="date" readonly name="duedate" value="${dd}"> 
                    </div>
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
            PubSub.publishSync('Loaded Projects', {
                 saved: savedProjects
            })
       
        }
      })
  }
   
}


