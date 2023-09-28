import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'regenerator-runtime';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // </React.StrictMode>,
);

if(module.hot) {
  module.hot.accept()
}