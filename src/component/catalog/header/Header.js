import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { AuthContext } from '../../../AuthContext/AuthContext';
import '../../../App.css'


export default function Header() {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    return (
        <>
            <div className="header">
                {/* <div className='header-title'>Header Title</div> */}
                <Link to="/" className='header-title'>Header Title</Link> 
                <div className="header-button">
                    <button onClick={() => logout() && history.push('/')} className="btn">Sign out</button>
                </div>
            </div>
        </>
        
    )
}
