import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './app.css';

import Pacotes from './pages/pacotes';
import Products from './pages/produtos';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Products} exact/>
        <Route path="/pacotes" component={Pacotes} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
