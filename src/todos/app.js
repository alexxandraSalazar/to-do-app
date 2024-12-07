import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './utils';


const elementIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
}
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () =>{
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        console.log(todos);
        renderTodos(elementIDs.TodoList, todos);
    }

    (() =>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.getElementById(elementId).append(app);
        displayTodos();
    })();

    // HTML References
    const newDescriptionInput = document.querySelector(elementIDs.newTodoInput);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) =>{
        if(event.keyCode !== 13) return;
        if(event.target.value.trim().length === 0) return;
        console.log(event.target.value)
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    })
};


