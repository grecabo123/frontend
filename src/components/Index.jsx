import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Index() {

    const [Register, setRegister] = useState({
        name: "",
        skills: "",
        email: "",
        password: "",
        error: [],
    });

    const handleinput = (e) => {
        e.persist();
        setRegister({ ...Register, [e.target.name]: e.target.value });
    }

    const Submit = (e) => {
        e.preventDefault();

        const data = {
            name: Register.name,
            skills: Register.skills,
            email: Register.email,
            password: Register.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if (res.data.status === 200) {
                    swal("Success",res.data.message,'success');
                    document.getElementById("reset").reset();
                }
                else {
                    setRegister({ ...Register, error: res.data.error });
                }
            }).catch((error) => {

                // Internal Server
                if (error.response.status === 500) {

                }
            })
        })


    }

    return (
        <React.Fragment>
            <div className="navbar">
                <ul>
                    
                    <li><Link to={'/display'}>Display Data</Link></li>
                </ul>
            </div>
            <div>
                <form onSubmit={Submit} id="reset">
                    <div className="center">
                        <ul>
                            <li><input type="text" name='name' onChange={handleinput} placeholder="Name" />
                                <span>{Register.error.name}</span>
                            </li>
                            <li><input type="text" name='skills' onChange={handleinput} placeholder="skills" />
                                <span>{Register.error.skills}</span></li>
                            <li> <input type="text" name='email' onChange={handleinput} placeholder="Email" />
                                <span>{Register.error.email}</span></li>
                            <li> <input type="password" name='password' onChange={handleinput} placeholder="Password" />
                                <span>{Register.error.password}</span></li>
                            <li> <button>Submit</button></li>
                        </ul>
                    </div>


                </form>
            </div>
        </React.Fragment>
    )
}

export default Index