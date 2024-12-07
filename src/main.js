import './assets/style.css';
import {App} from './todos/app.js';
import todoStore from './store/todo.store.js';

todoStore.initStore();
App('app'); // This will render the app in the element with the id 'app' in the index.html file