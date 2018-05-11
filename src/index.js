import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App8_with_interval';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App
  message="I'm a streaming app!"
  speed={ 100 }
/>, document.getElementById('root'));
registerServiceWorker();
