import React from 'react'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function LoginSignUp() {
    const [action, setAction] = React.useState("Sign Up")
    
    return (
        <div className='container'>
            <div className='header'>
                <div className='header-title'>{action}</div>
                <div className='header-underline'></div>
            </div>
            <div className="wrapper">
                {action === "Sign Up" ? <div className="input">
                    <div className="input-icon"><FaUser /></div>
                    <input className="input-form" type="text" placeholder="Username"/>
                </div> : null}
                <div className="input">
                    <div className="input-icon"><FaEnvelope /></div>
                    <input className="input-form" type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <div className="input-icon"><FaLock /></div>
                    <input className="input-form" type="password" placeholder="Password"/>
                </div>
                {action === "Login" ? <div className="forgot-pw">
                    Lost Password? <span>Click here</span>
                </div> : null}
                <div className="submit-container">
                    <button className={action === "Sign Up" ? "submit signup" : "submit gray"} onClick={() => setAction("Sign Up")}>Sign Up</button>
                    <button className={action === "Login" ? "submit login" : "submit gray"} onClick={() => setAction("Login")}>Login</button>
                </div>
            </div>
        </div>
    )
}


