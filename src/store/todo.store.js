import { Todo } from '../todos/models/todo.model';

export const Filters ={
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed'
}

const state = {
    todos : [

    ],
    filter: Filters.All,
}

const initStore = () =>{
    loadStore();
    console.log('initStore 😝');
}

/**
 * Loads the store from localStorage.
 */
const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
};



/**
 * Saves the current state to localStorage.
 */
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
};

/**
 * This function will return the todos
 * @param {*} filter 
 */
const getTodos = (filter = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        default:
            throw new Error('Invalid filter');
    }
}


/**
 * This function will add a todo
 * @param {String} description 
 */
const addTodo = (description) => {
    if(!description){
        throw new Error('Description is required');
    }
    state.todos.push(new Todo(description))

    saveStateToLocalStorage();
}

/**
 * This function will toggle a todo
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo =>{
        if(todo.id === todoId){
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

/**
 * This function will delete a todo
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

/**
 * This function will delete all completed todos
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filter.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * this function will return the current filter
 */
const getCurrentFilter = () => {
    return state.filter;
}


export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}