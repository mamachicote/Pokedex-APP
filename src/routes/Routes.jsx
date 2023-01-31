import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from 'react-router-dom';

import Home from '../layout/Home';
import Pokemon from '../layout/Pokemon';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="*" element={<Home />} />
        <Route path="/:id" element={<Pokemon />} />
      </Switch>
    </Router>
  );
};

export default Routes;
