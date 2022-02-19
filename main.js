(()=>{var t={798:function(t,e,o){t=o.nmd(t),function(o,i){"use strict";var s={};o.PubSub?(s=o.PubSub,console.warn("PubSub already loaded, using existing version")):(o.PubSub=s,function(t){var e={},o=-1;function i(t,e,o){try{t(e,o)}catch(t){setTimeout(function(t){return function(){throw t}}(t),0)}}function s(t,e,o){t(e,o)}function d(t,o,d,n){var r,c=e[o],a=n?s:i;if(Object.prototype.hasOwnProperty.call(e,o))for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&a(c[r],t,d)}function n(t){var o=String(t);return Boolean(Object.prototype.hasOwnProperty.call(e,o)&&function(t){var e;for(e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!0;return!1}(e[o]))}function r(t,e,o,i){var s=function(t,e,o){return function(){var i=String(t),s=i.lastIndexOf(".");for(d(t,t,e,o);-1!==s;)s=(i=i.substr(0,s)).lastIndexOf("."),d(t,i,e,o);d(t,"*",e,o)}}(t="symbol"==typeof t?t.toString():t,e,i);return!!function(t){for(var e=String(t),o=n(e)||n("*"),i=e.lastIndexOf(".");!o&&-1!==i;)i=(e=e.substr(0,i)).lastIndexOf("."),o=n(e);return o}(t)&&(!0===o?s():setTimeout(s,0),!0)}t.publish=function(e,o){return r(e,o,!1,t.immediateExceptions)},t.publishSync=function(e,o){return r(e,o,!0,t.immediateExceptions)},t.subscribe=function(t,i){if("function"!=typeof i)return!1;t="symbol"==typeof t?t.toString():t,Object.prototype.hasOwnProperty.call(e,t)||(e[t]={});var s="uid_"+String(++o);return e[t][s]=i,s},t.subscribeAll=function(e){return t.subscribe("*",e)},t.subscribeOnce=function(e,o){var i=t.subscribe(e,(function(){t.unsubscribe(i),o.apply(this,arguments)}));return t},t.clearAllSubscriptions=function(){e={}},t.clearSubscriptions=function(t){var o;for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&0===o.indexOf(t)&&delete e[o]},t.countSubscriptions=function(t){var o,i,s=0;for(o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&0===o.indexOf(t)){for(i in e[o])s++;break}return s},t.getSubscriptions=function(t){var o,i=[];for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&0===o.indexOf(t)&&i.push(o);return i},t.unsubscribe=function(o){var i,s,d,n="string"==typeof o&&(Object.prototype.hasOwnProperty.call(e,o)||function(t){var o;for(o in e)if(Object.prototype.hasOwnProperty.call(e,o)&&0===o.indexOf(t))return!0;return!1}(o)),r=!n&&"string"==typeof o,c="function"==typeof o,a=!1;if(!n){for(i in e)if(Object.prototype.hasOwnProperty.call(e,i)){if(s=e[i],r&&s[o]){delete s[o],a=o;break}if(c)for(d in s)Object.prototype.hasOwnProperty.call(s,d)&&s[d]===o&&(delete s[d],a=!0)}return a}t.clearSubscriptions(o)}}(s)),void 0!==t&&t.exports&&(e=t.exports=s),e.PubSub=s,t.exports=e=s}("object"==typeof window&&window||this)}},e={};function o(i){var s=e[i];if(void 0!==s)return s.exports;var d=e[i]={id:i,loaded:!1,exports:{}};return t[i].call(d.exports,d,d.exports,o),d.loaded=!0,d.exports}o.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{"use strict";(()=>{const t=document.getElementById("addNewProjectForm"),e=document.getElementById("projectOverlay"),o=document.getElementById("projectmodalClose");t.addEventListener("click",(t=>{e.style.display="block"})),o.addEventListener("click",(()=>{e.style.display="none"}));const i=document.getElementById("addNewTodoForm"),s=document.getElementById("todoOverlay"),d=document.getElementById("todomodalClose"),n=document.getElementById("todoEditModalClose"),r=document.getElementById("todoEditOverlay");i.addEventListener("click",(t=>{s.style.display="block"})),d.addEventListener("click",(t=>{t.preventDefault(),s.style.display="none"})),n.addEventListener("click",(t=>{t.preventDefault(),r.style.display="none"}));let c=document.getElementById("hamburger"),a=document.getElementById("projectcontainer");c.addEventListener("click",(t=>{a.classList.toggle("open")}))})();class t{constructor(t,e){this.id=e,this.title=t,this.todos=[],this.active=!1}}var e=o(798);class i{constructor(t,e,o,i,s,d=!1){this.id=t,this.title=e,this.dd=s,this.desc=o,this.pri=i,this.complete=d}}class s{constructor(){this.localStorage=window.localStorage,this.projects=[{id:0,title:"Default",todos:[],active:!0}],e.subscribe("Loaded Projects",((t,o)=>{this.projects=o.saved,e.publishSync("Loaded Active",{active:this.findActiveProject()})})),e.subscribe("Request Edit",((t,o)=>{let i=this.findActiveProject();for(let t=0;t<i.todos.length;t++)i.todos[t].id===parseInt(o.selected)&&e.publishSync("Give To Edit",{todo:i.todos[t]})}))}addProject(o){let i=new t(o,this.projects.length);this.projects.push(i),e.publishSync("Changed Projects",{projects:this.projects}),this.saveProjectstoLocalStorage(this.projects)}deleteProject(t){parseInt(t),this.projects.splice(t,1),e.publishSync("Changed Projects",{projects:this.projects}),this.saveProjectstoLocalStorage(this.projects)}toggleActivePropertyonProject(t){parseInt(t);for(let e=0;e<this.projects.length;e++)this.projects[e].id==t?this.projects[e].active=!0:this.projects[e].id!==t&&(this.projects[e].active=!1);e.publishSync("Changed Active",{active:this.findActiveProject()}),this.saveProjectstoLocalStorage(this.projects)}findActiveProject(){return this.projects.find((t=>t.active))}addTodo(t){let o=new i(this.findActiveProject().todos.length,t.todoTitle,t.todoDesc,t.todoPri,t.tododd);this.findActiveProject().todos.push(o),e.publishSync("Add Todo",{active:this.findActiveProject()}),this.saveProjectstoLocalStorage(this.projects)}deleteTodo(t){let o=parseInt(t.parentNode.parentNode.id),i=this.findActiveProject();i.todos.splice(o,1),e.publishSync("Delete Todo",{active:i}),this.saveProjectstoLocalStorage(this.projects)}editTodo(t,o){let i=this.findActiveProject();for(let s=0;s<i.todos.length;s++){if(i.todos[s].id!==parseInt(o))return;i.todos[s].title=t.todoTitle,i.todos[s].desc=t.todoDesc,i.todos[s].dd=t.tododd,i.todos[s].pri=t.todoPri,console.log(i.todos[s]),e.publishSync("Edit Todo",{active:i})}this.saveProjectstoLocalStorage(this.projects)}markTodoComplete(t){let e=this.findActiveProject();for(let o=0;o<e.todos.length;o++)e.todos[o].id===parseInt(t)&&(e.todos[o].complete=!0)}saveProjectstoLocalStorage(){this.localStorage.setItem("theProjects",JSON.stringify(this.projects))}}class d{constructor(){this.body=document.getElementById("body"),this.projectForm=document.getElementById("addProject"),this.appendProjects=document.getElementById("appendProjects"),this.projectOverlay=document.getElementById("projectOverlay"),this.appendTodos=document.getElementById("appendTodos"),this.projectButtons=Array.from(document.getElementsByClassName("project-button")),e.subscribe("Changed Projects",((t,e)=>{this.updateProjectsList(e.projects)})),this.todoForm=document.getElementById("todoForm"),this.todoOverlay=document.getElementById("todoOverlay"),this.selectedProject=document.getElementById("selectedProject"),this.emptyTodoMessage=document.getElementById("emptyTodo"),this.todoEditOverlay=document.getElementById("todoEditOverlay"),this.todoEditForm=document.getElementById("todoEditForm"),e.subscribe("Add Todo",this.displayActiveProjectsTodos.bind(this)),e.subscribe("Loaded Active",this.displayActiveProjectsTodos.bind(this)),e.subscribe("Delete Todo",this.displayActiveProjectsTodos.bind(this)),e.subscribe("Edit Todo",this.displayActiveProjectsTodos.bind(this))}updateProjectsList(t){let e=Array.from(t),o="";e.forEach(((t,e)=>{let i=t.title;t.active?o+=`\n            <div id="${e}" class="project-button active">\n                <li>\n                    ${i}\n                </li>\n                <div>\n                 <button class="deleteProject"><i id="${e}" class="fas fa-trash-alt"></i></button>\n                </div>\n            </div>\n                `:o+=`\n            <div id="${e}" class="project-button">\n                <li>\n                    ${i}\n                </li>\n            \n                <div>\n                 <button class="deleteProject"><i id="${e}" class="fas fa-trash-alt"></i></button>\n                </div>\n            </div>\n        `})),this.appendProjects.innerHTML=o}projectSubmitData(){return document.getElementById("projectTitle").value}todoSubmitData(){return{todoTitle:document.getElementById("todoTitle").value,todoDesc:document.getElementById("todoDesc").value,todoPri:document.getElementById("todoPri").value,tododd:document.getElementById("tododd").value}}bindAddProject(t){this.projectForm.addEventListener("submit",(e=>{e.preventDefault(),this.projectSubmitData()&&(t(this.projectSubmitData()),this.projectOverlay.style.display="none",this.projectForm.reset())}))}bindDeleteProject(t){this.appendProjects.addEventListener("click",(e=>{"I"===e.target.nodeName&&confirm("Delete This Project?")&&(t(e.target.id),this.appendTodos.innerHTML="")}))}bindActiveProject(t){this.appendProjects.addEventListener("click",(e=>{e.stopPropagation(),e.target.classList.contains("project-button")&&(t(e.target.id),this.styleActiveProject(e.target.id))})),e.subscribe("Changed Active",this.displayActiveProjectsTodos.bind(this))}bindAddToDo(t){this.todoForm.addEventListener("submit",(e=>{e.preventDefault(),e.stopPropagation(),this.todoSubmitData()&&(t(this.todoSubmitData()),this.todoOverlay.style.display="none",this.todoForm.reset())}))}bindDeleteTodo(t){this.appendTodos.addEventListener("click",(e=>{e.target.classList.contains("fa-trash-alt")&&t(e.target)}))}bindExpandTodo(){this.appendTodos.addEventListener("click",(t=>{if(t.target.classList.contains("fa-expand-arrows-alt")){let e=t.target.parentNode.parentNode.id;console.log(t.target.parentNode.parentNode.id);let o=document.getElementsByClassName("todo"),i=Array.from(o);for(let t=0;t<i.length;t++)i[t].id===e&&i[t].lastChild.previousSibling.nextSibling.classList.toggle("expand")}}))}todoEditSubmitData(){return{todoTitle:document.getElementById("todoEditTitle").value,todoDesc:document.getElementById("todoEditDesc").value,todoPri:document.getElementById("todoEditPri").value,tododd:document.getElementById("todoEditdd").value}}bindEditTodo(t){this.appendTodos.addEventListener("click",(o=>{if(o.target.classList.contains("fa-edit")){let i=o.target.parentNode.parentNode.id;this.todoEditOverlay.style.display="block",e.publishSync("Request Edit",{selected:i});const s=e.subscribe("Give To Edit",((t,e)=>{this.fillFormForEdit(e)}));e.unsubscribe(s),this.todoEditForm.addEventListener("submit",(e=>{e.preventDefault(),t(this.todoEditSubmitData(),i),this.todoEditOverlay.style.display="none",this.todoEditForm.reset()}))}}))}fillFormForEdit(t){document.getElementById("todoEditTitle").value=t.todo.title,document.getElementById("todoEditDesc").value=t.todo.desc,document.getElementById("todoEditPri").value=t.todo.pri,document.getElementById("todoEditdd").value=t.todo.dd}bindMarkComplete(t){this.appendTodos.addEventListener("click",(e=>{if(e.target.classList.contains("fa-circle")){let o=e.target.parentNode.parentNode.parentNode.id;t(o),this.visuallyMarkComplete(o)}}))}visuallyMarkComplete(t){let e=document.getElementsByClassName("todo"),o=Array.from(e);for(let e=0;e<o.length;e++)o[e].id===t&&o[e].classList.toggle("complete")}styleActiveProject(t){if(parseInt(t),this.projectButtons=Array.from(document.getElementsByClassName("project-button")),1===this.projectButtons.length)this.projectButtons[0].classList.add("active");else for(let e=0;e<this.projectButtons.length;e++)this.projectButtons[e].id===t?this.projectButtons[e].classList.add("active"):this.projectButtons[e].id!==t&&this.projectButtons[e].classList.remove("active")}displayActiveProjectsTodos=function(t,e){let o=e.active;if(null!=o){let t=o.title,e=o.todos,i="";this.selectedProject.textContent=`${t}`,console.log(e.length),0===e.length?(this.emptyTodoMessage.textContent="No Todos in this Project... Create One!",this.appendTodos.innerHTML=""):(e.forEach(((t,e)=>{this.emptyTodoMessage.textContent="";const{id:o,title:s,dd:d,desc:n,pri:r,complete:c}=t;i+="\n            ","High"===r?i+=`<li id="${e}" class="todo high">`:"Medium"===r?i+=`<li id="${e}" class="todo medium">`:"Low"===r&&(i+=`<li id="${e}" class="todo low">`),i+=`\n                <div class="left-todo">\n                    <button class="toggle-todo interface"><i class="fas fa-circle"></i></button>\n                     <p class="todo-title">${s}</p>\n                </div> \n                <div class="right-todo">\n                 `,i+='\n                        <i class="fas fa-edit"></i></button>\n                        <i class="fas fa-trash-alt"></i></button>\n                        <i class="fas fa-expand-arrows-alt"></i>\n                </div>\n                ',""===n||void 0===n?(i+='\n                    <div id="todoDesc" class="todoDesc">\n                        <p class="desc">No Description For This Todo.</p>\n                     ',""!==d&&void 0!==d||(i+='\n                        <div class="input desc">\n                            <p>No Dude Date!</p>\n                            <input type="date" readonly name="duedate"> \n                        </div>\n                        </div>')):i+=`\n                    <div id="todoDesc" class="todoDesc">\n                        <p class="desc">${n}</p>\n                        <div class="input desc">\n                            <p> This is due on: </p>\n                            <input type="date" readonly name="duedate" value="${d}"> \n                    </div>\n                    </div>\n                </li>\n                    `})),this.appendTodos.innerHTML=i)}};loadProjects(){window.addEventListener("load",(t=>{if(null!==window.localStorage.getItem("theProjects")){let t=JSON.parse(window.localStorage.getItem("theProjects")||[]);this.updateProjectsList(t),e.publishSync("Loaded Projects",{saved:t})}}))}}class n{constructor(){this.model=new s,this.view=new d,this.view.updateProjectsList(this.model.projects),this.view.bindAddProject(this.handleAddProject),this.view.bindDeleteProject(this.handleDeleteProject),this.view.bindActiveProject(this.handleActiveProject),this.view.bindAddToDo(this.handleAddTodo),this.view.bindDeleteTodo(this.handleDeleteTodo),this.view.bindEditTodo(this.handleEditTodo),this.view.bindMarkComplete(this.handleMarkComplete)}handleAddProject=t=>{this.model.addProject(t)};handleDeleteProject=t=>{this.model.deleteProject(t)};handleActiveProject=t=>{this.model.toggleActivePropertyonProject(t)};handleAddTodo=t=>{this.model.addTodo(t)};handleDeleteTodo=t=>{this.model.deleteTodo(t)};handleEditTodo=(t,e)=>{this.model.editTodo(t,e)};handleMarkComplete=t=>{this.model.markTodoComplete(t)}}document.addEventListener("DOMContentLoaded",(t=>{const e=new n;e.view.loadProjects(),e.view.bindExpandTodo()}))})()})();