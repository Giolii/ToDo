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












//dummy
const dummyChecklist = [
    'First things first rest in peace Uncle Phil', 
    'For real','you the only father that I ever knew', 
    'I get my bitch pregnant ', 
    `I'ma be a better you`,
    'Prophecies that I made way back in the Ville',
    'Fulfilled' ]
const project1 = createProject('Project 1');
const project2 = createProject('Project 2');
const todo1 = createToDo('title 1', 'description 1', '1/1/2011', 'high', dummyChecklist,'note1', 'PROJECT XYZHSGDFT');
const todo2 = createToDo('title 2', 'description 2', '2/2/2222', 'medium',dummyChecklist,'notenote2', 'PROJECT XYZHSGDFT');
const todo3 = createToDo('title 3', 'description 3', '3/3/2013', 'low',dummyChecklist,'note 3','PROJECT XYZHSGDFT');
const todo4 = createToDo('title 4', 'description 4', '4/4/2014', 'high',dummyChecklist,'notenote4','PROJECT XYZHSGDFT');
const todo5 = createToDo('title 5', 'description 5', '5/5/2015', 'medium',dummyChecklist,'note5','PROJECT XYZHSGDFT');
const todo6 = createToDo('title 6', 'description 6', '6/6/2016', 'low',dummyChecklist,'note 6','PROJECT XYZHSGDFT');

moveToDo(todo1,'Project 1')
moveToDo(todo2,'Project 2')
moveToDo(todo3,'Project 1')
moveToDo(todo4,'Project 2')
moveToDo(todo5,'Project 1')
moveToDo(todo6,'Project 2')
showProjects(returnProjects(),content)


if (module.hot) module.hot.accept()