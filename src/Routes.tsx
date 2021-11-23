import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';

export function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new-room" exact component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
