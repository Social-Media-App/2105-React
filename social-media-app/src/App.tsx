import React from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import SignUpForm from './components/SignUp/SignUpForm'
<<<<<<< HEAD
<<<<<<< HEAD
import { ButtonBase } from '@material-ui/core'
import CreatePost from './components/Post/createpost'
=======
import HomePage from './components/HomePage/homepage'
>>>>>>> cbba40388dadfad9f44d711cee693a7a342d0edf
=======
import { ButtonBase } from '@material-ui/core'
import CreatePost from './components/Post/createpost'
>>>>>>> 3de735b8e4eb2298682aafc6ad9045d676216aff

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
<<<<<<< HEAD
<<<<<<< HEAD
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={SignUpForm} />
          <ProtectedRoute path='/createpost' isAuth={isLoggedIn} component={CreatePost} />
=======
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={HomePage} /> 
>>>>>>> cbba40388dadfad9f44d711cee693a7a342d0edf
=======
          <ProtectedRoute path='/home' isAuth={isLoggedIn} component={SignUpForm} />
          <ProtectedRoute path='/createpost' isAuth={isLoggedIn} component={CreatePost} />
>>>>>>> 3de735b8e4eb2298682aafc6ad9045d676216aff
        </Switch>
      </Router>
    </>
  )
}

export default App