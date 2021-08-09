import React from 'react'
import {Link} from 'react-router-dom'
//import {BrowserRouter as Router, Route} from 'react-router-dom'
//import {useLocation} from 'react-router-dom'


const SignUpLink = () => {

    
    //const location=useLocation()
    return (
        <div >

            {<Link to='/ResetPassword' >Forgot password ?</Link>}<br/>
            {<Link to='/SignUpForm'>Sign up for SN Revature</Link>}

            {/* {location.pathname==='/'&&<Link to='/ResetPassword' >Forgot password ?</Link>}<br/>
            {location.pathname==='/'&&<Link to='/SignUpForm'>Sign up for SN Revature</Link>} */}
        </div>
    )
}

export default SignUpLink
