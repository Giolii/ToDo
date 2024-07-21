import './projectModal.css'
import './toDoModal.css'

export function formProject(){  
return new Promise((resolve, reject) => {
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
const projectTitleInput = document.getElementById('projectTitle');
const submitNewProject = document.getElementById('submitProjectButton')




  const openModal = () => {
    modal.style.display = 'block'
    projectTitleInput.value = '';
    projectTitleInput.focus();
  }

const closeModal = ()=> {
  modal.style.display = 'none'
  submitNewProject.removeEventListener('click', handleSubmit);

}

  const handleOutsideClick = (event)=>{
    if (event.target == modal) {
      closeModal();
    }
  }

  const handleSubmit = () => {
    const input = projectTitleInput.value.trim();
    if (input){
    resolve(input);
    closeModal()
    }else{
      alert('Project title cannot be empty!')
    }
  }
  openModal()
  close.addEventListener('click', closeModal);
  window.addEventListener('click', handleOutsideClick);
  submitNewProject.addEventListener('click', handleSubmit);
})}


// To Do
export function formToDo(projects){
  return new Promise((resolve, reject) => {
const modal = document.querySelector('.container-modal')
const close = document.querySelector('.close-todo');
const submitToDo = document.getElementById('submitToDoButton')
const projectDropdown = document.querySelector('.pickProject')

  const openModal = () => {
    modal.style.display = 'flex'    
    projectOptions(projects,projectDropdown)
    showChecklistAddToDo()
  }

const closeModal = ()=> {
  modal.style.display = 'none'
  clearForm()
  submitToDo.removeEventListener('click', handleSubmit);
}

  const handleOutsideClick = (event)=>{
    if (event.target === modal) {
      closeModal();
    }
  }

  const handleSubmit = () => {
  let title = document.getElementById('toDoTitle').value.trim()
  let description = document.getElementById('toDoDescription').value.trim();
  const dueDate = document.getElementById('toDoDate').value;
  const priority = document.getElementById('toDoPriority').value;
  let note = document.getElementById('toDoNote');
  const project = document.querySelector('.pickProject').value;

    if (title && description){
      const input = {
        title:title,
        description:description,
        dueDate:dueDate,
        priority:priority,
        checklist:checklist,
        note:note.value,
        project:project,
      }
      resolve(input);
      closeModal()
    } else { 
    alert('Enter valid Title and Description')
    }}

    const clearForm = () => {
      document.getElementById('toDoTitle').value = '';
      document.getElementById('toDoDescription').value = '';
      document.getElementById('toDoDate').value = '';
      document.getElementById('toDoNote').value = '';
      checklist = [];
      document.querySelector('.checkListText').innerHTML = 'Checklist:';
    }

  openModal()

  close.addEventListener('click', closeModal);
  window.addEventListener('click', handleOutsideClick);
  submitToDo.addEventListener('click', handleSubmit);
})
}

//Shows all the projects available in the new to do form
function projectOptions(projectsObj,dropdown){
  dropdown.innerHTML = ''
  projectsObj.forEach((project,index)=>{
          const newOption = document.createElement("option")
          newOption.textContent = project.title
          newOption.value = index
          dropdown.appendChild(newOption)
      })}


//Shows Checklist in the form
let checklist = []//Should make functions for this one
function showChecklistAddToDo(){
  const toDoCheckList = document.querySelector('.checkListText')  
  const areaChecklist = document.querySelector('#toDoCheckList')
  const addCheckListItem = document.getElementById('addCheckListItem')
  addCheckListItem.addEventListener('click',()=>{
      if(areaChecklist.value.trim()){
      const newItem = areaChecklist.value
      checklist.push(newItem)
      areaChecklist.value = ''
      areaChecklist.focus()
      toDoCheckList.innerHTML = 'Checklist:'
      } else {
          toDoCheckList.innerHTML = 'Checklist:'
      }
  checklist.forEach((item)=>{
      const newItem = document.createElement('li')
      newItem.textContent = item
      toDoCheckList.appendChild(newItem)
  })
  })  
}