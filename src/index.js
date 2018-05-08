import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App4 from './App4';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App4
  message="I'm a streaming app!"
  speed={ 100 }
/>, document.getElementById('root'));
registerServiceWorker();
