import React from 'react';

import {
  setObservableConfig,
  componentFromStream,
} from 'recompose';
import * as Rx from 'rxjs/Rx';

setObservableConfig({
  fromESObservable: Rx.Observable.from,
});

const App2 = componentFromStream(props$ =>
  Rx.Observable
    .interval(1000)
    .map(count => (<h1>{ count }</h1>)));

export default App2;
