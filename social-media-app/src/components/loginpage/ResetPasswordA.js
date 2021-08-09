import emailjs from "emailjs-com";
import React from 'react';
import * as ReactRedux from 'react-redux';
import {useState} from 'react'
import ProvideEmail from './ProvideEmail'
import ProvideCodePass from './ProvideCodePass'
import ResetPasswordB from './ResetPasswordB'
import ConfirmationPage from './ConfirmationPage'

import axios from 'axios';
import { ActionType, IAction } from "../../redux/reducer-logic/ActionStructure";


const mapStateToProps = (state: any) => {
    //logic goes here
    //said logic will extract the NECESSARY state you need, to simplify the component
    return {
        seekUser: state.myStateReducer.currentUser
      }
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
    //let's extract only the functionality we need to use
    return {
        onLogin: (incomingPayload: any) => { dispatch({ type: ActionType.LOGIN, payload: incomingPayload }) },
    }
}


interface IProps {
    onLogin: any
}

//var user=null;
 const  ResetPasswordA =() =>{
    const[estatus, setEstatus]=useState(1);
    const[codesent, setCodesent]=useState(0);
    const[codefromuser, setCodefromuser]=useState(0);
    const [emailState, setEmailState] = useState("");
    
  

    function sendEmail(e) {
       e.preventDefault()
        
       setEmailState(document.getElementById('email').value)
        console.log(document.getElementById('idd').value)

        let axiosFetcher = async () => {
        const axiosPayLoad: any = await axios.post('http://localhost:8080/Project2SN/api/user/getUser', {
            "user_email": document.getElementById('email').value
            
        });

        const axiosData: any = await axiosPayLoad.data;
       
        console.log("axiosdata: ", axiosData);
        
        if(axiosData)
            
        {
            emailjs.sendForm('service_vnbehtp', 'template_cqn7cap', e.target, 'user_6zGiz5wElkRFBjnMXMoVQ')
            .then((result) => {
                //console.log(result.status);
                setCodesent(document.getElementById('idd').value);
            
                setEstatus(2)
            }, (error) => {
                console.log(error.text);
            });
            //e.target.reset()
    
    

        }
        else
            alert("wrong one")

    }

    
    console.log("djjdjdjd : "+  axiosFetcher());
    


    }

   

  
    function compareCode(e){
        e.preventDefault()
  
     setCodefromuser(document.getElementById('coded').value)
     
        if (codesent===codefromuser){

           
            setEstatus(3)
      
        }
    
    }
    var passwordHash = require('password-hash');
    const GetPassword = (password)=>{
         // my working password hash
         var hashedPassword = passwordHash.generate(password);
         return hashedPassword;
       }
    
    function updatePassword(ex){
        ex.preventDefault()

        let axiosFetcher = async () => {
            const axiosPayLoad: any = await axios.post('http://localhost:8080/Project2SN/api/user/getUser', {
                "user_email": emailState
                
            });
            console.log(emailState)
            const axiosData: any = await axiosPayLoad.data;
            let user=axiosData;

            if(document.getElementById('pass1').value===document.getElementById('pass2').value){
                
                
                user.user_password=GetPassword(document.getElementById('pass1').value)

                let updatePass = async () => {
                    const axiosPayLoad1: any = await axios.put('http://localhost:8080/Project2SN/api/user/updatePassword',{
                        "userProfileImage": user.userProfileImage,
                        "user_email": user.user_email,
                        "user_first_name": user.user_first_name,
                        "user_id": user.user_id,
                        "user_last_name": user.user_last_name,
                        "user_password": user.user_password,
                        "user_phone": user.user_phone,
                        "user_registered_date": user.user_registered_date,
                        "username": user.username
                        
                    } );
                   
                    const axiosData1: any = await axiosPayLoad1.data;

                    console.log(axiosData1)
                }
                updatePass()
                setEstatus(4)
            }

            
            
            console.log("axiosdata: ", axiosData);

            console.log("user : ", user)
           
        }

        console.log(emailState)
        console.log(document.getElementById('pass1').value)
        console.log(document.getElementById('pass2').value)

        console.log("djjdjdjd : "+  axiosFetcher());



    }

    //console.log(compareCode())

    let Element;
   // props.seekUser ? sendEmail()   : Element=1

    if (estatus===1){
        Element=<ProvideEmail sendEmail={sendEmail} />
    
    }
    if(estatus===2){
        Element=< ProvideCodePass compareCode={compareCode}/>
    }
    if(estatus===3){
        Element=<ResetPasswordB updatePassword={updatePassword}/>
    }
    if(estatus===4){
        Element=<ConfirmationPage />
    }
    return(
        <div>
            <div className="container">
            <div className='PostHeader'><h2>PASSWORD RESET PROCESS</h2></div>
            <div className='line'></div>
           

            {Element}

           
           {/* {!estatus?<ProvideEmail sendEmail={sendEmail} />:compareCode()?<ResetPasswordB/>:< ProvideCodePass compareCode={compareCode}/>} */}
           {/* {compareCode()?<ResetPasswordB/>:''} */}
            </div>
            
        </div>
    )
}


export default ResetPasswordA 
export const PasswordA = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ResetPasswordA);