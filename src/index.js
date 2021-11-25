import { basicOp } from "./app/basicOp";

import { Controller } from "./app/Controller";

document.addEventListener("DOMContentLoaded", e => {
    const controller = new Controller()
    controller.view.loadProjects()
    controller.view.bindExpandTodo()
   
})

