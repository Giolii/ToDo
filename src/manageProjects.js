    const projects = [];

    //add project
    export function createProject(title){
        const project = {
            title:title,
            list:[],
        }
        projects.push(project)
    }

    export function deleteProject(index){
        projects.splice(index,1)     
    }

    export function returnProjects(){
        return projects;
    }

    //push todo to project
    export function moveToDo(toDo,project){//to review: didnt cancel from the previous project
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].title === project){
                projects[i].list.push(toDo)
            }
        }
    }
    export function newMoveToDo(toDo,index){//to review: didnt cancel from the previous project
        projects[index].list.push(toDo)
}

    //delete todos from project
    export function deleteToDo(projectIndex,toDoIndex){//to review: didnt cancwel from the previous project
        projects[projectIndex].list.splice(toDoIndex, 1)
        }
    

    export function displayToDo(project){
        for (let i = 0; i < projects.length; i++) {
            if(projects[i].title === project){
                return projects[i];
            }
        }
    }

    // function editToDo(toDo){}
    
    export function defaultProject(){
        if(projects.length === 0){
            createProject('Project')
        }
    }
