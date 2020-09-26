import React from 'react';
import './App.css';
import Hall from './components/Hall';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import 'remixicon/fonts/remixicon.css'

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Hall />
      </div>
    </Provider>
  );
}

export default App;
