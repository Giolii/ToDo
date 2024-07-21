import './style.css'; 
import createToDo from './toDoFactory.js';
import {createProject,returnProjects,newMoveToDo,defaultProject,moveToDo} from './manageProjects.js';
import showProjects from './interface.js'
import { formProject,formToDo } from './formsLogic.js';

const content = document.querySelector('.content');
const newToDo = document.querySelector('.new-todo');
const newProjectButton = document.querySelector('.new-project') 

newToDo.addEventListener('click',()=>{
    defaultProject()
    formToDo(returnProjects()).then(toDoObj =>{
        newMoveToDo(toDoObj,toDoObj.project)
        showProjects(returnProjects(),content)
    })
})

newProjectButton.addEventListener('click',()=> {
    formProject().then(projectTitle =>{
        createProject(projectTitle)
        showProjects(returnProjects(),content) 
    })
})

document.addEventListener('DOMContentLoaded', ()=>{
    showProjects(returnProjects(),content)
})


if (module.hot) module.hot.accept()