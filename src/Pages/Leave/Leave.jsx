import { IconButton, Tooltip } from "@mui/material";
import { indigo } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModalLeave from "./ModalLeave";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Config/Constants";


const Leave = () =>{
    const [requests, setRequests] = useState([]);
    const [departements, setDepartements] = useState([]);
    
    useEffect(() => {
        axios.get(API_URL + 'leaves').then(response => {
            setRequests(response.data.leaves)
            setDepartements(response.data.departements)
        }).catch(error => {
            console.log(error)
        })}, [])
    
    // const deleteLeave = (id) => {
    //     axios.delete(API_URL + 'delete-leave/' + id).then(response =>{
    //         window.location.reload();
    //     }).catch(error => {
    //         console.log(error.response.data.error);
    //     })
    // }
    return(
        <div className="col-9">
            <h3 className="mb-4">Leaves</h3>
            <div className="box">
                <h5>All Leaves :</h5>
                <table class="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th scope="col" style={{ color: "#063970" }}>Name</th>
                            <th scope="col" style={{ color: "#063970" }}>Leave Type</th>
                            <th scope="col" style={{ color: "#063970" }}>Start date</th>
                            <th scope="col" style={{ color: "#063970" }}>End date</th>
                            <th scope="col" style={{ color: "#063970" }}>Days</th>
                            <th scope="col" style={{ color: "#063970" }}>Status</th>
                            <th scope="col" style={{ color: "#063970" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <th scope="row">{request.employee?.first_name}</th>
                                <td>{request.leave_type}</td>
                                <td>{request.start_date}</td>
                                <td>{request.end_date}</td>
                                <td>{request.days}</td>
                                <td>{request.status}</td>
                                <td>
                                    <Tooltip placement="top" title="view detail">
                                        <IconButton sx={{ color: indigo["500"]}} data-bs-toggle="modal" data-bs-target={`#ModalLeave-${request.id}`}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                                <ModalLeave request={request} departements={departements}  key={request.id}/>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default Leave;