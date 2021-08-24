import './App.css';
import Catalog  from './component/catalog/Catalog';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthContext/AuthContext';
import Login from './component/Login';
import PrivateRoute from './component/privatRouter/PrivatRouter';
import { AddItem } from './component/catalog/additem/AddItem';
import Header from './component/catalog/header/Header';
import { RedactItem } from './component/catalog/RedactItem/RedactItem'


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
        <Header />
          <Switch>
            <PrivateRoute exact path='/' component={Catalog} />
            <Route exact path='/login' component={Login} />
            <Route path='/AddItem' component={AddItem} />
            <Route exact path='/RedactItem:id?' component={RedactItem}/>
          </Switch>
          
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;