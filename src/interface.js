import './interface.css'
import { deleteProject,returnProjects,deleteToDo } from "./manageProjects";
const content = document.querySelector('.content');

//SHow Projects in the homePage
    export default function showProjects(projects,container){
        container.innerHTML = '';


        for (let i = 0; i < projects.length; i++) {
            //Create container
            const newProject = document.createElement("div")
            newProject.classList.add(`project`)
            newProject.dataset.index = i
            //Add title
            const newTitle = document.createElement('div')
            newTitle.classList.add(`project-title`)
            newTitle.textContent = projects[i].title;
            newProject.appendChild(newTitle)
            //Delete Button
            const deleteButton = document.createElement('button')
            deleteButton.classList.add(`deleteButton`)
            deleteButton.textContent = 'X'
            deleteButton.dataset.index = i
            newTitle.appendChild(deleteButton)
            deleteButton.addEventListener('click',()=>{
                deleteProject(deleteButton.dataset.index)
                showProjects(returnProjects(),content)
            })
            //add ToDos values
            projects[i].list.forEach((todo,indexJ) => {
                const newTodo = document.createElement("div")
                newTodo.classList.add('todo-preview')
                const newTodoTitle = document.createElement('div')
                newTodoTitle.classList.add('todo-preview-title')
                newTodoTitle.dataset.todo = indexJ //Which todo is clicked
                newTodoTitle.dataset.project = i //Which project is the ToDo clicked
                newTodoTitle.addEventListener('click',(e)=>{
                    showToDo(e)
                })
                //Preview of the toDo in the main page
                const newTodoPriority = document.createElement('div')
                const newTodoDate = document.createElement('div')
                newTodoTitle.textContent = todo.title
                newTodoDate.textContent = todo.dueDate
                //priority color
                newTodoPriority.textContent = todo.priority
                newTodo.classList.add(todo.priority)
                newProject.appendChild(newTodo)
                newTodo.appendChild(newTodoTitle)
                newTodo.appendChild(newTodoPriority)
                newTodo.appendChild(newTodoDate)
            //Delete ToDos
                const deleteToDoButton = document.createElement('button')
            deleteToDoButton.classList.add(`deleteToDo`)
            deleteToDoButton.textContent = 'X'
            deleteToDoButton.dataset.index = indexJ
            newTodo.appendChild(deleteToDoButton)
            deleteToDoButton.addEventListener('click',()=>{
                deleteToDo(i,deleteToDoButton.dataset.index)
                showProjects(returnProjects(),content)
            }
            )
            }
        );
        container.appendChild(newProject);
        }
    }
































    


    function showToDo(e){ //When toDo preview is clicked 
        //Build container
        const container = document.createElement('div')
        container.classList.add('container')
        document.body.appendChild(container)
        //Remove container on click
        document.addEventListener('click',(event)=>{
            if (event.target === container) {
                document.body.removeChild(container);
              }      
         })
        //Fill container with toDo
        const toDoPage = document.createElement('div')
        toDoPage.classList.add('toDoPage')
        container.appendChild(toDoPage)
        const projects = returnProjects()

        // Build and fill To Dos divs
        const projectTodo = projects[e.target.dataset.project].list[e.target.dataset.todo]
        Object.keys(projectTodo).forEach(key => {
            if(key === 'info'){return}
            if(key === 'priority'){
                const itemPriority = document.createElement('select')
                itemPriority.classList.add('itemPriority')
                toDoPage.appendChild(itemPriority)
                const high = document.createElement('option')
                high.textContent = 'HIGH'
                itemPriority.appendChild(high)
                const medium = document.createElement('option')
                medium.textContent = 'MEDIUM'
                itemPriority.appendChild(medium)
                const low = document.createElement('option')
                low.textContent = 'LOW'
                itemPriority.appendChild(low)
                return;
            } //Checklist behaviour
            if(key === 'checklist'){
                const checklistContainer = document.createElement('div')
                toDoPage.appendChild(checklistContainer)
                const addChecklistItem = document.createElement('button')
                addChecklistItem.classList.add('addChecklistItem')
                addChecklistItem.textContent = 'Add item to CheckList'
                checklistContainer.appendChild(addChecklistItem)

                function loadChecklist(){
                const checklist = projects[e.target.dataset.project].list[e.target.dataset.todo].checklist
                checklist.forEach((item,index)=>{
                    const oneListContainer = document.createElement('div')
                    oneListContainer.classList.add('oneListContainer')
                    checklistContainer.appendChild(oneListContainer)
                    const itemList = document.createElement('div')
                    const deleteItem = document.createElement('div')
                    deleteItem.textContent = 'X'
                    deleteItem.classList.add('deleteChecklistItem')
                    deleteItem.dataset.index = index
                    itemList.textContent = item
                    oneListContainer.appendChild(deleteItem)
                    oneListContainer.appendChild(itemList)
                    deleteItem.addEventListener('click', ()=> {
                        checklistContainer.innerHTML = ''
                        const addChecklistItem = document.createElement('button')
                        addChecklistItem.classList.add('addChecklistItem')
                        addChecklistItem.textContent = 'Add item to CheckList'
                        checklistContainer.appendChild(addChecklistItem)
                        deleteItemFromList(deleteItem,projectTodo,loadChecklist)                       
                })})
                // return;
            }
            loadChecklist()
            return;
            }
            const item = document.createElement('div')
            item.classList.add(`toDo-${key}`)
            item.textContent = projects[e.target.dataset.project].list[e.target.dataset.todo][key]
            console.log(key.value)
            toDoPage.appendChild(item)
            makeToDoEditable(item)
        })
    }

    function makeToDoEditable(item){
        item.addEventListener('click', (e) => {
            if (item.querySelector('input')) return;
            const input = document.createElement('input')
            input.type = 'text'
            input.value = item.textContent
            // input.classList.add
            item.textContent = ''
            item.appendChild(input)
            input.focus()
            
            const saveChanges =()=>{
                item.textContent = input.value
                input.remove()
            }

            input.addEventListener('keydown', (e) =>{
                if(e.key === 'Enter') { saveChanges()}
            })

            input.addEventListener('blur', saveChanges);

        })
    }

    function deleteItemFromList(item,projectToDo,loadFunction){

        projectToDo.checklist.splice(item,1)
        loadFunction()
    }