import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Route,
  useParams,
} from 'react-router-dom';
import BroadcasterField from './BroadcasterField';

function App() {
  return (
    <Router>
      <Route path="/project/:projName" component={ Broadcaster } />
    </Router>
  );
}

function Broadcaster() {
  const { projName } = useParams();
  return (
    <div>
      {projName}
      <BroadcasterField path={projName} />
    </div>
  );
}

export default App;
