import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App10_stream_in_render';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App
  message="I'm a streaming app!"
  speed={ 100 }
/>, document.getElementById('root'));
registerServiceWorker();
