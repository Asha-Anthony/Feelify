import React, { useState , useEffect } from "react";
import Home from "../../home";
export default function Login(props){
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loggedIn , setLog] = useState(false)

   async function validateUser(){
    fetch("http://127.0.0.1:5000/checkUser", {
      method: 'POST',
      body: JSON.stringify({
        username: user,
        password: pass,
      }), // The data
      headers: {
        'Content-type': 'application/json' 
      }
    }).then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            console.log(data.success)

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
      validateUser()
  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        validateUser();
        
    }

    return (
      <div>
      { loggedIn ? (<Home username ={ user}/>):(
        <div className="auth-form-container">
            <h2> Feelify Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="user">Username</label>
                <input value={user} onChange={(e) => setUser(e.target.value)}type="text" placeholder="" id="user" name="user" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>)}
        </div>
    )
}
