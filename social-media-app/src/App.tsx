import React from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import SignUpForm from './components/SignUp/SignUpForm'
import { ButtonBase } from '@material-ui/core'
import CreatePost from './components/Post/createpost'

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
            <Button variant='contained' color='primary' onClick={handleInputLogin}> Login </Button><br></br>
            <Link to="/home">Go To Protected Page</Link> <br></br>
            <Link to="/createpost">Create Post</Link> 
          </Route>
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={SignUpForm} />
          <ProtectedRoute path='/createpost' isAuth={isLoggedIn} component={CreatePost} />
        </Switch>
      </Router>
    </>
  )
}

export default App