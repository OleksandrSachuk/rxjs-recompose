import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App9_click_and_ajax_request';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App
  message="I'm a streaming app!"
  speed={ 100 }
/>, document.getElementById('root'));
registerServiceWorker();
