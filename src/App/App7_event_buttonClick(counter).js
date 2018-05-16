import React from "react";
import rxjsConfig from "recompose/rxjsObservableConfig";
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler,
} from "recompose";
import { Observable } from "rxjs";

setObservableConfig(rxjsConfig);

const Counter = ({ value, onInc, onDec }) => (
  <div>
    <button onClick={ onInc }>+</button>
    <h2>{ value }</h2>
    <button onClick={ onDec }>-</button>
  </div>
);

const CounterStream = componentFromStream(
  props$ => {

    const {
      stream: onInc$,
      handler: onInc,
    } = createEventHandler();

    const {
      stream: onDec$,
      handler: onDec,
    } = createEventHandler();

    return props$
      .switchMap(props =>
        Observable.merge(
          onInc$.mapTo(1),
          onDec$.mapTo(-1),
        )
          .startWith(props.value)
          .scan((acc, curr) => acc + curr),
      )
      .map(value => ({ value, onInc, onDec }))
      .map(Counter)
  },
);

const App = () => (
  <div>
    <CounterStream value={3}/>
  </div>
);

export default App;
