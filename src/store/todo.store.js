import { Todo } from '../todos/models/todo.model';

const Filters ={
    All: 'All',
    Pending: 'Pending',
    Completed: 'Completed'
}

const state = {
    todos : [
        new Todo('nada'),
        new Todo('todo'),
        new Todo('maso'),
    ],
    filter: Filters.All,
}

const initStore = () =>{
    console.log(state);
    console.log('initStore 😝');
}

/**
 * This function will load the store from the local storage
 */
const loadStore = () =>{
    throw new Error ('loadStore not implemented yet 😝');
}

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
}

/**
 * This function will delete a todo
 * @param {String} todoId 
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

/**
 * This function will delete all completed todos
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filter.All) => {
    state.filter = newFilter;
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