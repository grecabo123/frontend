import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import swal from 'sweetalert';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'


export default function Display() {

    const [DataDisplay, setData] = useState([]);
    const queryClient = useQueryClient()

    // useEffect(() => {
    //     axios.get(`/api/display`).then(res => {
    //         if (res.data.status === 200) {
    //             setData(res.data.data)
    //         }
    //     }).catch((error) => {
    //         if (error.response.status === 500) {
    //             swal("Warning", error.response.statusText, 'warning');
    //         }
    //     })
    // }, []);

    const query = useQuery('data',async () =>{
        const data = await axios.get(`/api/display`);
        // return data;
        setData(data.data)
    },{
        refetchInterval: 3000
        // refetchOnWindowFocus: true,
    });
    // console.log(DataDisplay.data)
    // console.log(query.data.data.data)
    // setData(query.data.data.data)

    const DeleteData = (e) => {
        const id = e.target.value;

        axios.post(`/api/delete/${id}`).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, 'success');
                setInterval(() => {
                    window.location.href = "/display";
                }, 2000);

            }
            else if (res.data.status === 504) {
                swal("Warning", res.data.error, 'warning');
            }
        }).catch((error) => {
            if (error.response.status === 500) {

            }
        }) 
    }

    if(query.isLoading){
        return <h4>Loading Data...</h4>
    }
    if(query.isError){
        return <h4>Please try again</h4>
    }

    return (
        <div>

            <div className="navbar">
                <ul>

                    <li><Link to={'/'}>Register Data</Link></li>
                </ul>
            </div>
            <ul>
                <div className='padd'>
                    {
                         DataDisplay.data === "No Data to Display" ? "No Data" : DataDisplay.data.map((data, id) => {
                            return (
                                <>
                                    <div key={id}>
                                        <li>Name: {data.name}</li>
                                        <li>Email: {data.email}</li>
                                        <li>Skills: {data.skills}</li>
                                        <li><Link to={`/edit/refid=${data.id}`} className="edit-btn">Edit</Link></li>
                                        <li><button value={data.id} onClick={DeleteData} className="delete-btn">Delete</button></li>
                                        <hr />
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </ul>
        </div>
    )

}