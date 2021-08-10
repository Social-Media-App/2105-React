import React from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import SignUpForm from './components/SignUp/SignUpForm'
import HomePage from './components/HomePage/homepage'

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
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={HomePage} /> 
        </Switch>
      </Router>
    </>
  )
}

export default App
