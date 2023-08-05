import React, { useState , useEffect } from "react";
import Home from "../../home";
export default function Register (props){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [uname, setUName] = useState('');  
    
    const [loggedIn , setLog] = useState(false)
    const namesArray = name.split(' ');

    async function addUser(){
        fetch("http://127.0.0.1:5000/addUser", {
          method: 'POST',
          body: JSON.stringify({
            first_name :namesArray[0],
            last_name : namesArray[1],
            username: uname,
            password: pass,
            email: email
          }), // The data
          headers: {
            'Content-type': 'application/json' 
          }
        }).then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                console.log(data)
                if (data.success===true){
                    setLog(true);
                    console.log(loggedIn)
                  }
            })
        );
         
    
        }
    
        useEffect(() => {
          // Using fetch to fetch the api from
          // flask server it will be redirected to proxy
          addUser()
      }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser()
    }

    return (
        <div>
      { loggedIn ? (<Home username ={ uname}/>):(
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="uname">User name</label>
            <input value={uname} name="uname" onChange={(e) => setUName(e.target.value)} id="uname" placeholder="User Name" />          
             <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>)}
    </div>
    )
}