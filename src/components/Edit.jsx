import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Edit(props) {

    const [Details, setdetails] = useState([]);

    const history = useHistory();

    const handleinput = (e) => {
        e.persist();
        setdetails({ ...Details, [e.target.name]: e.target.value });
    }

    useState(() => {
        const id = props.match.params.id;

        axios.get(`/api/GetData/${id}`).then(res => {
            if (res.data.status === 200) {
                setdetails(res.data.data);
            }
            else if (res.data.status === 504) {
                swal("Warning", res.data.error, 'warning');
                history.push('/display');
            }
        }).catch((error) => {
            if (error.response.status === 500) {
                swal("Warning", error.response.statusText, 'warning');
            }
        })

    }, [props.match.params.id])

    const UpdateData = (e) =>{
        e.preventDefault();

        const data = Details;
        const id = props.match.params.id;
        axios.put(`/api/update/${id}`,data).then(res =>{
            if(res.data.status === 200){
                swal("Success",res.data.message,'success');
                setTimeout(() =>{
                    history.push('/display');
                },900);
            }
        }).catch((error) =>{
            swal("Warning",error.response.statusText,'warning');
        })

    }

    return (
        <div>
             <div className="navbar">
                <ul>
                    
                    <li><Link to={'/display'}>Display Data</Link></li>
                </ul>
            </div>
            <div className="center">
                <ul>
                    <form onSubmit={UpdateData}>
                        <li><input type="text" name='name' value={Details.name} onChange={handleinput} placeholder="Name" />
                            {/* <span>{Register.error.name}</span> */}
                        </li>
                        <li><input type="text" name='skills' value={Details.skills} onChange={handleinput} placeholder="skills" />
                        
                        </li>
                        <li> <input type="text" name='email' value={Details.email} onChange={handleinput} placeholder="Email" />
                            {/* <span>{Register.error.email}</span> */}
                        </li>
                        {/* <li> <input type="password" name='password' value={Details.pas} onChange={handleinput} placeholder="Password" /> */}
                        {/* <span>{Register.error.password}</span> */}

                        <li> <button>Submit</button></li>
                    </form>
                </ul>
            </div>
        </div>
    )
}

export default Edit