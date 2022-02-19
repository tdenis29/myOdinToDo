export const basicOp = (() => {
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
const todoEditModalClose = document.getElementById('todoEditModalClose')
const todoEditOverlay = document.getElementById('todoEditOverlay')

addNewTodoForm.addEventListener('click', (e) => {
    todoOverlay.style.display = 'block';
})

todomodalClose.addEventListener('click', (e) => {
    e.preventDefault()
    todoOverlay.style.display = "none"
    });

todoEditModalClose.addEventListener('click', e => {
    e.preventDefault()
    todoEditOverlay.style.display = "none"
})

// Hamburger For mobile

//modal
let hamburger = document.getElementById('hamburger');
let projectcontainer = document.getElementById('projectcontainer')

hamburger.addEventListener('click', (e) => {
    projectcontainer.classList.toggle('open')
});

})();