import React from "react";
import rxjsConfig from "recompose/rxjsObservableConfig";
import {
  setObservableConfig,
  componentFromStream,
  createEventHandler,
  mapPropsStream,
  compose,
} from "recompose";
import { Observable } from "rxjs";

setObservableConfig(rxjsConfig);

const count = mapPropsStream(props$ => {
  const {
    stream: onInc$,
    handler: onInc,
  } = createEventHandler();

  const {
    stream: ondec$,
    handler: onDec,
  } = createEventHandler();

  return props$
    .switchMap(props =>
        Observable.merge(
          onInc$.mapTo(1),
          ondec$.mapTo(-1),
        )
          .startWith(0)
          .scan((acc, curr) => acc + curr),
      (props, count) => ({ ...props, count, onInc, onDec }),
    )
});

const load = mapPropsStream(props$ =>
  props$
    .switchMap(props => Observable.ajax(`https://swapi.co/api/people/${props.count}`)
        .pluck('response')
        .startWith({ name: 'loading...' })
        .catch(err => Observable.of({ name: 'Not found' })),
      (props, person) => ({
        ...props, person,
      }),
    ),
);

const typeWriter = mapPropsStream(props$ =>
  props$
    .switchMap(props => Observable.zip(
      Observable.from(props.person.name),
      Observable.interval(100),
      letter => letter,
      )
        .scan((acc, curr) => acc + curr),
      (props, name) => ({ ...props, person: { ...props.person, name } }),
    ));
const Counter = props => (
  <div>
    <button onClick={ props.onInc }>+</button>
    <button onClick={ props.onDec }>-</button>
    <h3>{ props.count }</h3>
    <h1>{ props.person.name }</h1>
  </div>
);

const CounterWithPersonLoader = compose(
  count,
  load,
  typeWriter,
)(Counter);

const App = () => (
  <div>
    <CounterWithPersonLoader />
  </div>
);

export default App;
