const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



document.addEventListener("DOMContentLoaded", getLocalToDo);
todoButton.addEventListener("click", addDo);
filterOption.addEventListener("click", filterToDo);

function addDo(event){
    event.preventDefault();
    
    if(todoInput.value === "") return;

     const newTodo = document.createElement("li");
     const text = document.createElement("p");
     text.classList.add("todo-text");
     text.innerText = todoInput.value;
     
      saveLocalToDo(todoInput.value);

     newTodo.appendChild(text);
     newTodo.classList.add("todo-item");
     const completeBtn = document.createElement("button");
     completeBtn.innerHTML = '<i class="far fa-check-circle"></i>';
     const deleteBtn = document.createElement("button");
     deleteBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
     completeBtn.classList.add("complete-button");
     completeBtn.addEventListener("click", deleteCheck);
     deleteBtn.classList.add("delete-button");
     deleteBtn.addEventListener('click', deleteCheck);

     newTodo.appendChild(completeBtn);
     newTodo.appendChild(deleteBtn);

     todoList.appendChild(newTodo);
     todoInput.value="";

}

function deleteCheck(event){
    
    if(event.target.classList[0] === 'delete-button'){
       event.target.parentElement.classList.add("fall");
       removeToDo(event.target.parentElement);
       event.target.parentElement.addEventListener("transitionend", function(){
        event.target.parentElement.remove();
       })
    }

    if(event.target.classList[0] === 'complete-button'){
        event.target.parentElement.classList.toggle("completed");
     }
}


function filterToDo(e){
    const todos = todoList.childNodes;

    todos.forEach(function(todo){
        console.log(todo.innerText);
    })

  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}


function saveLocalToDo(todo){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalToDo(){

    if(localStorage.getItem("todos") === null) return;

    let todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach((todo)=>{
        const newTodo = document.createElement("li");
        const text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = todo;
        
        newTodo.appendChild(text);
        newTodo.classList.add("todo-item");
        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="far fa-check-circle"></i>';
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fas fa-minus-circle"></i>';
        completeBtn.classList.add("complete-button");
        completeBtn.addEventListener("click", deleteCheck);
        deleteBtn.classList.add("delete-button");
        deleteBtn.addEventListener('click', deleteCheck);
   
        newTodo.appendChild(completeBtn);
        newTodo.appendChild(deleteBtn);
   
        todoList.appendChild(newTodo);
     
    })

}


function removeToDo(todo){
    if(localStorage.getItem("todos") === null) return;
    let todos = JSON.parse(localStorage.getItem("todos"));

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

