import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Main from '@pages/Main';
import Signin from '@pages/Signin';
import Signup from '@pages/Signup';
import Messenger from '@pages/Messenger';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/messenger/:uid' component={Messenger} />
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;
