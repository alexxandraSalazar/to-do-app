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

    // Function to render todos and update the pending count
    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIDs.TodoList, todos);
        updatePendingcount();
    };

    // Function to update the pending count
    const updatePendingcount = () => {
        renderPendingTodos(elementIDs.PendingCounter);
    };

    // Function to handle filter changes
    const handleFilterChange = (event) => {
        filtersLIs.forEach(el => el.classList.remove('selected')); 
        event.target.classList.add('selected');

        const filterMap = {
            'Todos': Filters.All,
            'Completados': Filters.Completed,
            'Pendientes': Filters.Pending,
        };

        const filter = filterMap[event.target.textContent];
        if (filter) {
            todoStore.setFilter(filter);
            displayTodos();
        }
    };

    // Initial setup
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

    // Listeners for adding todos
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    // Listeners for toggling and deleting todos
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

    // Listener for clearing completed todos
    deleteCompletedB.addEventListener('click', () => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    // Listeners for filters
    filtersLIs.forEach(element => {
        element.addEventListener('click', handleFilterChange);
    });
};
