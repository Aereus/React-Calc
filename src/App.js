

import './App.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import Home from './Home'
import Result from './Result'

function App() {
  return(
    <div className="App">
      <Router>
        <Switch>
          <Route path="/result"><Result /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
