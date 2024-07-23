import './interface.css'
import { deleteProject,returnProjects,deleteToDo } from "./manageProjects";
const content = document.querySelector('.content');

    //Empty container, Create projects, attach them to the container
    export default function showProjects(projects,container){
        container.innerHTML = '';
        localStorage.clear();
    projects.forEach((project,projectIndex)=>{
        const projectElement = createProjectElement(project,projectIndex)
        container.appendChild(projectElement)
        localStorage.setItem(`project ${projectIndex}`, JSON.stringify(project));
        // console.table(JSON.parse(localStorage.getItem(`project ${projectIndex}`)))
    });
    }

    //Create project div, add class and index, append title 
    //and elements of the todo. return the project
    function createProjectElement(project,projectIndex){
        const projectElement = document.createElement('div');
        projectElement.classList.add('project')
        projectElement.dataset.index = projectIndex
    
        const projectTitleElement = createProjectTitleElement(project.title,projectIndex)
        projectElement.appendChild(projectTitleElement)

        project.list.forEach((todo,todoIndex) =>{
            const todoElement = createTodoElement(todo,projectIndex,todoIndex)
            projectElement.appendChild(todoElement)
        });
        return projectElement;
    }   
    //Create title and delete button
    function createProjectTitleElement(title,projectIndex){
        const titleElement = document.createElement('div');
        titleElement.classList.add('project-title');
        titleElement.textContent = title;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'X'
        deleteButton.dataset.index = projectIndex
        deleteButton.addEventListener('click', handleDeleteProject)

        titleElement.appendChild(deleteButton)

        return titleElement;
    }

    //Delete project logic
    function handleDeleteProject(event){
        const index = event.target.dataset.index
        deleteProject(index)
        showProjects(returnProjects(),document.querySelector('.content'))
    }
    //Populate project UI with to dos previews
    function createTodoElement(todo,projectIndex,todoIndex){
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo-preview');

        const titleElement = document.createElement('div');
        titleElement.classList.add('todo-preview-title');
        titleElement.textContent = todo.title;
        titleElement.dataset.todo = todoIndex;
        titleElement.dataset.project = projectIndex;
        titleElement.addEventListener('click',showToDo)

        const priorityElement = document.createElement('div')
        priorityElement.textContent = todo.priority
        todoElement.classList.add(todo.priority)

        const dateElement = document.createElement('div');
        dateElement.textContent = todo.dueDate;

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('deleteToDo')
        deleteButton.textContent = 'X'
        deleteButton.dataset.projectIndex = projectIndex
        deleteButton.dataset.todoIndex = todoIndex
        deleteButton.addEventListener('click', handleDeleteTodo)

        todoElement.appendChild(titleElement);
        todoElement.appendChild(priorityElement);
        todoElement.appendChild(dateElement);
        todoElement.appendChild(deleteButton);

        return todoElement;
    }

    function handleDeleteTodo(event){
        const projectIndex = event.target.dataset.projectIndex
        const todoIndex = event.target.dataset.todoIndex
        deleteToDo(projectIndex,todoIndex)
        showProjects(returnProjects(),document.querySelector('.content'))
    }

    //Open Todo
    function showToDo(e){
        const thisProject = e.target.dataset.project
        const thisToDo = e.target.dataset.todo

        const container = createContainer();
        const toDoPage = createToDoPage(container)

        populateToDoPage(toDoPage,thisProject,thisToDo,container)

        //Close To do if click outside of the form
        container.addEventListener('click',(event)=>{
            if (event.target === container){
                document.body.removeChild(container)
            }
        })
    }

    function createContainer(){
        const container = document.createElement('div')
        container.classList.add('container')
        document.body.appendChild(container)
        return container;
    }

        function createToDoPage(container){
            const toDoPage = document.createElement('div')
            toDoPage.classList.add('toDoPage')
            container.appendChild(toDoPage)
            return toDoPage;
        }

        function populateToDoPage(toDoPage, thisProject,thisToDo,container) {
            const toDo = returnProjects()[thisProject].list[thisToDo]
            Object.keys(toDo).forEach(key => {
                switch(key) {
                    case 'priority':
                    createPrioritySelect(toDoPage, toDo);
                    break;
                    case 'checklist':
                    createChecklist(toDoPage, toDo);
                    break;
                    case 'project':
                    createProjectChoice(toDoPage, toDo,thisProject,thisToDo,container)
                    break;
                default:
                    createDefaultItem(toDoPage,key,toDo);
                    break;
                }
            });}
        
            function createDefaultItem(toDoPage,key,projectToDo,event){
                const item = document.createElement('div')
                item.classList.add(`toDo-${key}`)
                item.dataset.name = key;
                item.textContent = projectToDo[key]
                toDoPage.appendChild(item)
                makeToDoEditable(item,projectToDo,event)
            }

        // Add project options when todo is opened
        function createProjectChoice(toDoPage, projectTodo,thisProject,thisToDo,container){
            const projectContainer = document.createElement('select')
            projectContainer.classList.add('changeProjectContainer')
            toDoPage.appendChild(projectContainer)
            populateProjectsOptions(projectContainer,thisProject)
            attachProjectChangeListener(projectContainer, projectTodo,thisProject,thisToDo,container)
        }

        function populateProjectsOptions(projectContainer,thisProject){
            returnProjects().forEach((project, index) => {
            const projectOption = document.createElement('option');
            projectOption.dataset.index = index;
            projectOption.textContent = project.title;
            projectContainer.appendChild(projectOption);
            if(index.toString() === thisProject.toString()){
                projectOption.selected = true
            }
        })}

        function attachProjectChangeListener(projectContainer, projectTodo, thisProject,thisToDo,container){
            projectContainer.addEventListener('change',(e) => {
                const projects = returnProjects()
                //Push toDo in new project
                projects[e.target.selectedIndex].list.push(projectTodo)
                //Cancel toDo from old project
                projects[thisProject].list.splice(thisToDo, 1)
                showProjects(projects,document.querySelector('.content'))
                document.body.removeChild(container)
            })
        }

        function createPrioritySelect(parent, project) {
            //Create priority item in the todo Page
            const select = document.createElement('select');
            select.classList.add('itemPriority');
            ['HIGH', 'MEDIUM', 'LOW'].forEach(level => {
                const option = document.createElement('option');
                option.textContent = level;
                if (level.toLowerCase() === project.priority) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
            parent.appendChild(select);
            //Save selection on project object 
            select.addEventListener('change', (e)=>{
                project.priority = e.target.value.toLowerCase()
                showProjects(returnProjects(),document.querySelector('.content'))
            })
            
        }


    function createChecklist(parent,projectTodo){
        const checklistContainer = document.createElement('div')
        checklistContainer.classList.add('toDo-checklist')
        parent.appendChild(checklistContainer)

        const addChecklistItemButton = document.createElement('button')
        addChecklistItemButton.classList.add('addChecklistItem')
        addChecklistItemButton.textContent = 'Add item to checklist'
        parent.appendChild(addChecklistItemButton)

        addChecklistItemButton.addEventListener('click',() => {
            const itemText = prompt('Enter checklist item:')
            if (itemText.trim()){
                projectTodo.checklist.push(itemText)
                updateChecklist(checklistContainer,projectTodo)
            }
        })
        updateChecklist(checklistContainer,projectTodo)
    }

    function updateChecklist(container,projectToDo){
        container.innerHTML = ''
        
        projectToDo.checklist.forEach((item,index)=>{
            const itemContainer = document.createElement('div')
            itemContainer.classList.add('oneListContainer')

            const itemDiv = document.createElement('div')
            itemDiv.textContent = item

            const deleteButton = document.createElement('div')
            deleteButton.textContent = 'X'
            deleteButton.classList.add('deleteChecklistItem')
            deleteButton.dataset.index = index
            deleteButton.addEventListener('click', () =>{
                projectToDo.checklist.splice(index, 1)
                updateChecklist(container,projectToDo)
            })
            itemContainer.appendChild(deleteButton)
            itemContainer.appendChild(itemDiv)
            container.appendChild(itemContainer)
        })
        showProjects(returnProjects(),document.querySelector('.content'))
    }

    function makeToDoEditable(item,project,event){
        item.addEventListener('click',()=>{
            if(item.querySelector('input'))return;

            const input = document.createElement('input')
            input.type = 'text'
            input.value = item.textContent
            item.textContent = ''
            item.appendChild(input)
            input.focus()
            input.addEventListener('keydown', (e) =>{
                if (e.key === 'Enter') saveChanges(item,input,project,event);
            })
            
            input.addEventListener('blur',()=> saveChanges(item,input,project))
        })
    }
    
    function saveChanges(item, input, project) {
        //Interface chang
        item.textContent = input.value;
        input.remove();
        //Object change
        Object.keys(project).forEach(key => {
            if ((key === 'checklist') || 
            (key === 'priority') ||
            (key === 'projectBelong')) return
            if (key === item.dataset.name){
                project[key] = item.textContent
            }
        })
        showProjects(returnProjects(),document.querySelector('.content'))
}
