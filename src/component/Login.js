import React, { useState } from 'react'
import { Redirect } from 'react-router';
import { useAuth } from '../AuthContext/AuthContext';
import { useHistory } from 'react-router';

const Login = () => {
    const { currentUser, login, signup } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const history = useHistory()

    const handleLogin = async (e) => {
        
        try {
            e.preventDefault()
            setError('');
            await login(email, password);
            history.push('/')
        } catch (e) {
            setError("Failed to log in")
        }
    }

    if ( currentUser ) {
        return <Redirect to='/' />
    }
    
    return (
        <div className="signin">
            <form action="">
                <h1>Sign in</h1>
                <input  value={email} onChange={(e) => setEmail(e.target.value) }/>
                <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin} className='btn'>Sign in </button>
                <h6> <div className="login-message">Not yet register?</div> <span onClick={() => signup(email,password)} className="signin__link btn">Sign up</span></h6>
            </form>
        </div>
    )
}

export default Login;