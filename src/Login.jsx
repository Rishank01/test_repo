import {useState, useEffect} from 'react';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
function Login() {

    const [loginData, setLoginData] = useState({
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setLoginData({
            ...loginData, 
            [e.target.name] : e.target.value,
        });
    }

    const login = async (e) => {
        e.preventDefault();
        if(!loginData.email || !loginData.password ) {
            // Show toast,
            console.error("Enter All details");
        }
        else {
            const {data} = await axios.post(`http://localhost:3030/users/${loginData.email}/login`, {
                password: loginData.password,
            });
            console.log(data);
            localStorage.setItem("token", data.access_token);
        }
    }

    return (
        <div>
            <form>
                <label htmlFor='email'>Email</label>
                <input type = "email" value = {loginData.email} name='email' placeholder='Enter Email' onChange={handleChange}></input>

                <label htmlFor='password'>Password</label>
                <input type = "password" value = {loginData.password} name='password' placeholder='Enter Password' onChange={handleChange}></input>

                <button onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;