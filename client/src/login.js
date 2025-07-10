import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router';//to switch to another
const Login=()=>{
    const navigate=useNavigate();//initialize useNavigate hook method
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const loginUser=(e)=>{
        e.preventDefault(); //send a request to your server to log in the user
        // const data={
        //     email:email,
        //     password:password
        // };
        const data = {email:email,password:password};
        fetch('http://localhost:8000/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=>{
            if(response.ok){
            return response.json();
            } else {
                alert('login failed');
            }

        }).then(data => {
            if(data.message!=='success'){
                alert('Invalid Credentials');
                return;
            }
            console.log('login successful:',data);
            localStorage.setItem('token',data.token);
            localStorage.setItem('firstname',data.data);
            //navigate to the home page or dashboard
            navigate('/'); // redirect to home page
        }).catch(error=>{
            console.log('Error:',error);
            alert('An error occured while logging in')
        });
    }
    return(
        <div className="container">
            <h1>Login</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="enter email"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password"  onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
                </div>
                <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
export default Login;