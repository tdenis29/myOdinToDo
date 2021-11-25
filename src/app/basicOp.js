const basicOp = (() => {
// Project modal
//open modal
const addNewProjectForm = document.getElementById('addNewProjectForm');
const projectOverlay = document.getElementById('projectOverlay')
const projectmodalClose = document.getElementById("projectmodalClose");

addNewProjectForm.addEventListener('click', (e) => {
    projectOverlay.style.display = 'block';
})

projectmodalClose.addEventListener('click', () => {
    projectOverlay.style.display = "none"
});

// ToDo Modal 
const addNewTodoForm = document.getElementById('addNewTodoForm');
const todoOverlay = document.getElementById('todoOverlay')
const todomodalClose = document.getElementById("todomodalClose");

addNewTodoForm.addEventListener('click', (e) => {
    todoOverlay.style.display = 'block';
})

todomodalClose.addEventListener('click', (e) => {
    e.preventDefault()
    todoOverlay.style.display = "none"
    });





})();