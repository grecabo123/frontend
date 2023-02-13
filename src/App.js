import axios from 'axios'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Display from './components/Display';
import Edit from './components/Edit';
import Index from './components/Index'


axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

axios.defaults.withCredentials = true;


function App() {
    return (
       <Router>
        <Switch>
            <Route path={'/'} exact component={Index}></Route>
            <Route path={'/display'} exact component={Display}></Route>
            <Route path={'/edit/refid=:id'} exact component={Edit}></Route>
        </Switch>
       </Router>
    )
}

export default App