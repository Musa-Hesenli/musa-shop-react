import React, { Suspense } from 'react'
import AOS from 'aos';
import ErrorBounder from './Bounders/ErrorBounder'
import Loader from './Bounders/Loader'

import 'aos/dist/aos.css';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { getCookie } from '../store/reducers/authSlice';
import SingleItem from './single-item/SingleItem';
import Cart from './cart/Cart';
import Favorites from './favorites/Favorites';
import WithDraw from './withdraw/WithDraw';


const Header = React.lazy(() => import('../components/common-parts/Header'));
const Footer = React.lazy(() => import('../components/common-parts/Footer'));
const Index = React.lazy(() => import('../components/home/Index'));
const Login = React.lazy(() => import('./authentication/Login'));
const Register = React.lazy(() => import('./authentication/Register'));


const App = () => {
  AOS.init();
  const username = getCookie('username');
  const email = getCookie('email');
  const access_token = getCookie('access_token');

  return (
    <div className="App">
      <ErrorBounder>
        <Suspense fallback={<Loader />}>
          <Router>
            <Header email={email} username={username} access_token={access_token}/>
            <Switch>
              <Route path='/login' exact component={Login} />
              <Route path='/create-account' component={Register} exact /> 

              {!username ? <Redirect to='/login'/> : ''}
              <Route path='/' exact component={Index}/>
              <Route path='/products/:id' component={SingleItem}/>
              <Route path='/account' exact render={() => 'Account'}/>
              <Route path='/account/cart' component={Cart}/>
              <Route path='/account/favorites' component={Favorites}/>
              <Route path='/order' component={WithDraw}/>
              <Route render={() => (<h1>Not found</h1>)} />
            </Switch>
          </Router>
          <Footer />
        </Suspense>
      </ErrorBounder>
    </div>
  );
}



export default App;


