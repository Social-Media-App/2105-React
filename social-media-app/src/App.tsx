import React from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import SignUpPage from './components/SignUp/SignUpPage'
import HomePage from './components/HomePage/homepage'
import ProfilePage from './components/ProfilePage/profilepage'
import Login from './components/login/login-page';
import SendEmail from './components/send-email-forgot-password/send-email'
import ResetPass from './components/reset-pass/reset-pass'
import {RootState} from './redux/store'

function App () {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector((state:RootState)=>state.auth.isLoggedIn);

  // Boilerplate to test redux store on a
  const handleInput = () => {
    dispatch(userLogin('david', 'password'))
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Login />
            {/* <HomePage/> */}
          </Route>
          <Route path='/register'>
            <SignUpPage />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/send-email'>
            <SendEmail />
          </Route>
          <Route path='/reset-pass'>
            <ResetPass />
          </Route>
          {/* <ProtectedRoute path='/home' isAuth={isLoggedIn} component={HomePage} />  */}
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={ProfilePage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
