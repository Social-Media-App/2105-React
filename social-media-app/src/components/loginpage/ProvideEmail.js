import React from 'react'

const ProvideEmail = ({sendEmail},{message}) => {
    const id=Math.ceil(Math.random()*1000000)+1
  
    return (
        <div>
             <form onSubmit={sendEmail}>
                    
            
                    <div className="form-control" id='div3'>
                        <input type="email"  placeholder="Enter Email" name="temail" required id="email"/>
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <input type="text" className="form-control" placeholder="Enter Email" id="idd" name="id"  value={id}
                         hidden/>
                    </div>
                    <div className="col-8 pt-3 mx-auto">
                        <input type="submit" className="btn btn-info" value="Send Password Reset Email"></input>
                    </div>
               
            </form>
        </div>
    )
}

export default ProvideEmail
