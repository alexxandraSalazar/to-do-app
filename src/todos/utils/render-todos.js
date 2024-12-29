import { Todo } from "../models/todo.model.js";
import { createTodoHtml } from "./";

let element;
/**
 * 
 * @param {String} elementID 
 * @param {Todo} todos 
 */

export const renderTodos = (elementID, todos = []) =>{
    if(!element){
        element = document.querySelector(elementID);
    }

    element.innerHTML = ''; 

    todos.forEach(todo =>{
        element.append(createTodoHtml(todo));
    })
}