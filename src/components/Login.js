import React from 'react'
import './Login.css';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [mail, setMail] = useState("")
    const navigate = useNavigate()

    const handleOnChange = (event) => {
        setMail(event.target.value)
    }
    const getMail = (event) => {
        event.preventDefault()
        const emailPattern = /^[A-Za-z0-9._%+-]+@iith\.ac\.in$/
        if (!emailPattern.test(mail)) {
            alert("Enter a Valid Mail")
        } else {
            navigate("/home/" + mail.toString())
        }

    }
    return (
        <div>
            <div className="navbar">
                <div className='app-name'>CAB SHARING</div>
            </div>
            <div className="login-cont">
                <form>
                    <label htmlFor="mail-box">MAIL-ID</label><br />
                    <input type="text" id="mail-box" value={mail} onChange={handleOnChange} /><br />
                    <input type="submit" value="GO" id="button" onClick={getMail} />
                </form>
            </div>
        </div>
    )
}
