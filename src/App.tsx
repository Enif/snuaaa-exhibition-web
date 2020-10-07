import React, { useEffect } from 'react';
import './App.css';
import Hall from './components/Hall';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import 'remixicon/fonts/remixicon.css'
import { Router, useHistory } from 'react-router';
import { createBrowserHistory } from 'history';
import Section from './components/Section';

const store = createStore(rootReducer);

function App() {

  const history = createBrowserHistory();
  
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Section />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
