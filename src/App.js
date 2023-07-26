
import React , {useState} from 'react'
import Home from './screens/home'
import Login from './screens/auth/login';
import Register from './screens/auth/register'
import './App.css'

export default function App() {
  const [currentForm, setCurrentForm] = useState('login');


  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

    return (
      <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
      </div>)
}

