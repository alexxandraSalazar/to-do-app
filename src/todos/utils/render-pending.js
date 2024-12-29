import todoStore, { Filters } from '../../store/todo.store';

export const renderPendingTodos = (elementId) => {
    const element = document.querySelector(elementId);

    if (!element) {
        console.warn(`Element ${elementId} not found`);
        return; 
    }

    const pendingTodosCount = todoStore.getTodos(Filters.Pending).length;
    element.innerHTML = pendingTodosCount;
}
