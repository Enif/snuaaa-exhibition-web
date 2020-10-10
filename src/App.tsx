import React, { useEffect } from 'react';
import { Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

import Section from './components/Section';
import rootReducer from './reducers';

import './App.css';
import 'remixicon/fonts/remixicon.css'

function App() {

  const history = createBrowserHistory();
  const store = createStore(rootReducer, composeWithDevTools());

  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
      alert("MicroSoft Internet Explorer에서는 홈페이지가 정상 동작하지 않을 수 있습니다.")
    }
    else if ((navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1)) {
      alert("MicroSoft Internet Explorer에서는 홈페이지가 정상 동작하지 않을 수 있습니다.")
    }
    else {

    }
  }, [])


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
