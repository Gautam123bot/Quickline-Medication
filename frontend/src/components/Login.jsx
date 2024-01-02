import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import Home from '../pages/Home';

function Login() {
    return(
        <>
            <h1>Hello world</h1>

            <Link to="/../pages/Home">Click here</Link>
        </>
    )
}
 
export default Login;