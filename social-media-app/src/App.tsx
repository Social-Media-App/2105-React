import React from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import { userLogin } from './redux/actons'
import Button from '@material-ui/core/Button'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ResetPass from './components/reset-pass/reset-pass'

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
          <Route path='/reset-pass'>
            <ResetPass />
          </Route>
          <Route path='/'> <h1>Hello World</h1> </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
