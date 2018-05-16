import React from 'react';

import {
  setObservableConfig,
  componentFromStream,
} from 'recompose';
import * as Rx from 'rxjs/Rx';

setObservableConfig({
  fromESObservable: Rx.Observable.from,
});

const App = props => (
  <div>
    <h1>App</h1>
  </div>
);

const App3 = componentFromStream(props$ =>
  props$.map(App)
);

export default App3;
