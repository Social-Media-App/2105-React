import React from 'react'
import './App.css'
<<<<<<< HEAD
import { useDispatch } from 'react-redux'
import { userLogin } from './redux/actions'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginComponent from './components/loginpage/loginpage'
=======
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import SignUpForm from './components/SignUp/SignUpForm'
>>>>>>> fef15cc04be3d42d0bf60b63a49491eb01d2e5e8

function App () {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);



  // Boilerplate to test redux store on a
  const handleInputLogin = () => {
    dispatch(userLogin("",""))
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Button variant='contained' color='primary' onClick={handleInputLogin}> Login </Button>
            <Link to="/home">Go To Protected Page</Link>
          </Route>
<<<<<<< HEAD
          <Route path='/'>  <LoginComponent/> </Route>
=======
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={SignUpForm} /> 
>>>>>>> fef15cc04be3d42d0bf60b63a49491eb01d2e5e8
        </Switch>
      </Router>
    </>
  )
}

export default App