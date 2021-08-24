import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    console.log( currentUser )
    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
      ></Route>
    )
  }


