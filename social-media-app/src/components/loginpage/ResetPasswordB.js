import React from 'react'

const ResetPasswordB = ({updatePassword}) => {
    return (
        <div>
            <form onSubmit={updatePassword}>
                    <div className="row pt-5 mx-auto">
        
                        <div className="form-control" id='div3'>
                            <input type="password" className="form-control" placeholder="Enter New Password" id="pass1" name="password"/>
                        </div>
                        <div className="form-control" id='div4'>
                            <input type="password" className="form-control" placeholder="Re-enter New Password" id ="pass2" name="password2"/>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Reset Password" ></input>
                        </div>
                    </div>
                </form>
        </div>
    )
}

export default ResetPasswordB
