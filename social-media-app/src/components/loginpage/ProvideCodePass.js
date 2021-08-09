import React from 'react'

import {useState} from 'react'



const ProvideCodePass = ({compareCode}) => {
    const[code, setCode]=useState('')

//const setCode=()=>{setCode(document.getElementById("coded").value)}
    return (
        <div>
            <form onSubmit={compareCode} >
                    <div className="row pt-5 mx-auto">
        
                        <div className="form-control" id='div3'>
                            <input type="number" className="form-control" placeholder="Enter Code" id="coded" name="code" value={code}
                           onChange={(e)=>setCode(e.target.value)} />
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Validate"></input>
                        </div>
                    </div>
            </form>
        </div>
    )
}

export default ProvideCodePass
