///<reference path="./../node_modules/@types/react-dom/experimental.d.ts" />
///<reference path="./../node_modules/@types/react/experimental.d.ts" />
import * as ReactDOM from 'react-dom';
const { createRoot } = ReactDOM;
import './assets/css/app.css';
import App from './components/App';
import 'core-js';

const el = document.getElementById('app-root');
createRoot(el!).render(<App />);