import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './utils';
import { renderPendingTodos } from './utils';

const elementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCounter: '#pending-count',
};

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);
        updatePendingcount();
    };

/**
 * This function updates the pending co
 */
    const updatePendingcount = () => {
        renderPendingTodos(elementIDs.PendingCounter);
    };

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.getElementById(elementId).append(app);
        displayTodos();
    })();

    // HTML References
    const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
    const todoListUl = document.querySelector(elementIDs.TodoList);
    const deleteCompletedBtn = document.querySelector(elementIDs.ClearCompleted);
    const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);

    // Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUl.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (element) {
            if (event.target.matches('.destroy')) {
                todoStore.deleteTodo(element.getAttribute('data-id'));
            } else {
                todoStore.toggleTodo(element.getAttribute('data-id'));
            }
            displayTodos();
        }
    });

    deleteCompletedBtn.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    })


    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) =>{
            filtersLIs.forEach(el => el.classList.remove('selected')); 
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                    break;
                    
            }
            displayTodos();
        })
    })
};
