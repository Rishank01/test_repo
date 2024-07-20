import { useState, useEffect } from 'react';
import axios from 'axios';
import './Register.css'
import toast, { Toaster } from 'react-hot-toast';

function Register() {
    const email_error = () => toast("Enter Valid Email");
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        cnf_password: ""
    });

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    }

    const submitData = async (e) => {
    
        // .
        e.preventDefault();

        try {
            if (userData.password.length === 0 || !userData.firstname ||!userData.lastname || !userData.email || !userData.address || !userData.phone || !userData.password || !userData.cnf_password || (userData.password !== userData.cnf_password)) {
                // Do something
                console.error("Enter all data");
                // validating email
                // check for ,-,
            } else {
                if(userData.email.indexOf(",") !== -1 || userData.email.indexOf("-") !== -1 || userData.email.indexOf("@") === -1) {
                    // Give a Error toast,
                    console.log("Enter a valid email");
                    email_error();
                    return;
                }
                console.log("submitting data");
                const response = await axios.post("http://localhost:3030/signup", {
                    ...userData
                });
                console.log(response);
            }
        } catch {

        }
        // console.log(userData);
    }
    // useEffect(() => {
    //     console.log(userData);
    // }, [userData])

    return (
        <div>
            <form>
                <label for="f-name">First Name</label>
                <input name="firstname" value={userData.firstname} id="f-name" type="text" onChange={handleChange}></input>

                <label for="l-name">Last Name</label>
                <input name="lastname" value={userData.lastname} id="l-name" type="text" onChange={handleChange}></input>

                <label for="email">Email</label>
                <input name="email" value={userData.email} id="email" type="email" onChange={handleChange}></input>

                <label for="password">Password</label>
                <input name="password" value={userData.password} id="password" type="password" onChange={handleChange}></input>

                <label for="cnf-password">Confirm Password</label>
                <input name="cnf_password" value={userData.cnf_password} id="cnf-password" type="password" onChange={handleChange}></input>

                <label for="address">Address</label>
                <textarea name="address" value={userData.address} id="address" rows={10} cols={7} onChange={handleChange}></textarea>

                <label for="phone">Phone</label>
                <input name="phone" value={userData.phone} id="phone" type="text" onChange={handleChange}></input>

                <button onClick={submitData}>Submit data</button>
            </form>
            <Toaster/>
        </div>
    )
}

export default Register;