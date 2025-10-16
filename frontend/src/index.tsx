
import * as ReactDOM from 'react-dom/client';

import App from './App';


// @ts-ignore
import './assets/index.css';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(

      <App />

  );
} else {
  console.error('Error')
}


