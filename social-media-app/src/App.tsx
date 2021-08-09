import React from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { userLogin } from './redux/actions'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginComponent from './components/loginpage/loginpage'

function App () {
  const dispatch = useDispatch()

  // Boilerplate to test redux store on a
  const handleInput = () => {
    dispatch(userLogin('david', 'password'))
  }

  return (
    <>
      <Router>
        <Switch>
          <Route path='/home'>
            <Button variant='contained' color='primary' onClick={handleInput}> Test Redux State </Button>
          </Route>
          <Route path='/'>  <LoginComponent/> </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App