import html from './app.html?raw';

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    (() =>{
        const app = document.createElement('div');
        app.innerHTML = html;
        document.getElementById(elementId).append(app);
    })();
};