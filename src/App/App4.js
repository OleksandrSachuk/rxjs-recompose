import React from 'react';

import {
  setObservableConfig,
  componentFromStream,
} from 'recompose';
import * as Rx from 'rxjs/Rx';

setObservableConfig({
  fromESObservable: Rx.Observable.from,
});

const createTypewritter = (message, speed) =>
  Rx.Observable.zip(
    Rx.Observable.from(message),
    Rx.Observable.interval(speed),
    letter => letter,
  )
    .scan((acc, curr) => acc + curr);

const App = props => (
  <div>
    <h1>{props.message}</h1>
  </div>
);

const App4 = componentFromStream(props$ =>
  props$
    .switchMap(props => 
    createTypewritter(props.message, props.speed)
    )
    .map(message=> ({message}))
    .map(App),
);

export default App4;
