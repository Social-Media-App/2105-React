import React from 'react'
import {Link} from 'react-router-dom';

const ConfirmationPage = () => {
    return (
        <div>
            <br/><br/><p>Congratulations!!!!!!!!!!!!!!!!!!!!!</p>
            <br/><br/>
            <p>You have successfully update your password. Please click below to login</p>

            <br/><br/><br/>

            <Link to='/'>Click here to login</Link>
        </div>
    )
}

export default ConfirmationPage
