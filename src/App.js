import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import FeedPage from './pages/FeedPage';

const App = () => <div>

    <Router>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/sign-up" exact component={SignUpPage} />
        <Route path="/feed" exact component={FeedPage} />
    </Router>


</div>

export default App;